import db from '../../../config/db';
import { checkPassword } from '../../security';
import * as jwt from 'jsonwebtoken';

const { APP_AUTH_SECRET, BASIC_LOGIN_USERNAME, BASIC_LOGIN_PASSWORD } = process.env;

interface JWTData {
    id: number,
    name: string,
    email: string,
    avatar: string,
}

const login = async (_, { data }, ctx) => {
    // Basic login
    if (!checkBasicLogin(ctx)) {
        return new Error('invalid basic authentication');
    }

    // Realize a new login
    const { email, password } = data;
    const User = await db('web_user').where({ email }).first();

    if (!User) {
        return new Error('invalid login');
    }

    const authenticated = await checkPassword(password, User.password)
    if (!authenticated) {
        return new Error('invalid login');
    }

    const token = createNewToken(User, ctx);

    return { token };
}

const refreshToken = async (_, { }, ctx) => {
    console.log('refresh_token');
    // Basic login

    if (!checkBasicLogin(ctx)) {
        return new Error('invalid basic authentication');
    }

    const cookieToken = parseCookies(ctx.req)['refresh_token'];

    const valid = jwt.verify(cookieToken, APP_AUTH_SECRET);
    if (!valid) {
        return Promise.reject(new Error('Refresh token expired'));
    }

    const jwtData: JWTData | any = jwt.decode(cookieToken);
    const { id } = jwtData;

    const User = await db('web_user').where({ id }).first();

    const token = createNewToken(User, ctx);

    return { token };
}

const logout = async (_, { }, ctx) => {
    console.log('logout');

    // Create a refresh-token cookie empty for logout
    ctx.res.cookie('refresh_token', '', { httpOnly: true });

    return { token: '' };
}

const parseCookies = (request) => {
    const rc = request.headers.cookie;
    const list = {};

    rc && rc.split(';').forEach((cookie) => {
        const parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

const checkBasicLogin = (ctx) => {
    const req = ctx.req;
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return false;
    }

    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (BASIC_LOGIN_USERNAME === username && BASIC_LOGIN_PASSWORD === password) {
        return true;
    }

    return false;
}

const createNewToken = (User, ctx) => {
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

    const token = jwt.sign(jwtPayload, APP_AUTH_SECRET, { expiresIn: 3600 })

    // Create a refresh-token and send a httpOnly cookie
    const refreshToken = jwt.sign({ sub: "WEBEditor", id: User.id }, APP_AUTH_SECRET, { expiresIn: (24 * 60 * 60) })
    ctx.res.cookie('refresh_token', refreshToken, { httpOnly: true })

    return token;
}

export {
    login,
    refreshToken,
    logout,
}