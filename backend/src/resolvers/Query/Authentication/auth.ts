import db from '../../../config/db';
import { checkPassword } from '../../security';
import * as jwt from 'jsonwebtoken';

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

    const { APP_AUTH_SECRET } = process.env;
    const token = jwt.sign({ sub: "WEBEditor", id: User.id }, APP_AUTH_SECRET, { expiresIn: 300 })

    // Create a refresh-token and send a httpOnly cookie
    const refreshToken = jwt.sign({ sub: "WEBEditor" }, APP_AUTH_SECRET, { expiresIn: (60 * 60 * 24) })
    ctx.res.cookie('token', refreshToken, { httpOnly: true })

    return { token, webUser: User };
}

export {
    login,
}