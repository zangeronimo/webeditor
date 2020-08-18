import db from '../../../config/db';
import { checkPassword } from '../../security';
import * as jwt from 'jsonwebtoken';

interface JWTData {
    id: number,
    name: string,
    email: string
}

const login = async (_, { data }, ctx) => {
    const { email, password } = data;
    const User = await db('web_user').where({ email }).first();

    if (!User) {
        return new Error('invalid login');
    }

    const authenticated = await checkPassword(password, User.password)
    if (!authenticated) {
        return new Error('invalid login');
    }

    const jwtPayload = {
        sub: "WEBEditor",
        id: User.id,
        name: User.name,
        email: User.email,
        avatar: User.avatar,
    }

    const { APP_AUTH_SECRET } = process.env;
    const token = jwt.sign(jwtPayload, APP_AUTH_SECRET, { expiresIn: 15 })
    // const token = jwt.sign(jwtPayload, APP_AUTH_SECRET, { expiresIn: (24 * 60 * 60) })

    // Create a refresh-token and send a httpOnly cookie
    const refreshToken = jwt.sign({ sub: "WEBEditor", id: User.id }, APP_AUTH_SECRET, { expiresIn: (60 * 60 * 24) })
    ctx.res.cookie('token', refreshToken, { httpOnly: true })

    return { token, webUser: User };
}

const parseCookies = (request) => {
    const list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        const parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

const refreshToken = async (_, { }, ctx) => {
    console.log('refresh_token');
    const { APP_AUTH_SECRET } = process.env;
    const cookieToken = parseCookies(ctx.req)['token'];

    const valid = jwt.verify(cookieToken, APP_AUTH_SECRET);
    if (!valid) {
        return Promise.reject(new Error('Refresh token expired'));
    }

    const jwtData: JWTData | any = jwt.decode(cookieToken);
    const { id } = jwtData;

    const User = await db('web_user').where({ id }).first();

    if (!User) {
        return Promise.reject(new Error('invalid login'));
    }

    const jwtPayload = {
        sub: "WEBEditor",
        id: User.id,
        name: User.name,
        email: User.email,
        avatar: User.avatar,
    }

    const token = jwt.sign(jwtPayload, APP_AUTH_SECRET, { expiresIn: 5 })
    // const token = jwt.sign(jwtPayload, APP_AUTH_SECRET, { expiresIn: (24 * 60 * 60) })

    // Create a refresh-token and send a httpOnly cookie
    const refreshToken = jwt.sign({ sub: "WEBEditor", id: User.id }, APP_AUTH_SECRET, { expiresIn: (24 * 60 * 60) })
    ctx.res.cookie('token', refreshToken, { httpOnly: true })

    return { token, webUser: User };
}

export {
    login,
    refreshToken,
}