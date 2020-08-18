import jwt from 'jsonwebtoken';
import db from './db';

export default async ({ request, response }) => {
    const auth = request.headers.authorization;
    const token = auth && auth.includes('Bearer ') && auth.substring(7);

    let webUser = null;
    let permission = null;

    if (token) {
        try {
            const secret = process.env.APP_AUTH_SECRET;
            const valid = jwt.verify(token, secret);
            if (valid) {
                const contentToken = jwt.decode(token);
                const id = contentToken['id'];
                if (id) {
                    // if token is valid and has a user id
                    webUser = await db('web_user').where({ id }).first();
                    // permission = getRules(webUser);
                }
            }
            // invalid token
        } catch (e) {
            // invalid token
        }
    }

    // if (usuario && usuario.perfis) {
    //     admin = usuario.perfis.includes('admin')
    // }

    const err = new Error('Acesso negado!')

    return {
        req: request,
        res: response,
        getWebClient() {
            return webUser ? webUser.web_client_id : null;
        }
    }
}