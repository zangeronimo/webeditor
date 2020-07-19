import db from '@config/db';
import { checkPassword } from '../../security';
import * as jwt from 'jsonwebtoken';
import { APP_SECRET } from '../../../../.env';

const Login = async (_, { data }) => {
    const { email, password } = data;
    const User = await db('web_user').where({ email }).first();

    if (!User) {
        return new Error('invalid login');
    }

    const authenticated = await checkPassword(password, User.password)
    if (!authenticated) {
        return new Error('invalid login');
    }

    const token = jwt.sign({ userId: User.id }, APP_SECRET)
    return { token, webUser: User };
}

export {
    Login,
}