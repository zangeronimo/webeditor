import jwt from 'jsonwebtoken';
import db from './db';
import { webRules } from '../resolvers/Type/System/WebUser';

export default async ({ request, response }) => {
    let webUser = null;
    let permissions = [];

    const auth = request.headers.authorization;
    const token = auth && auth.includes('Bearer ') && auth.substring(7);

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

                    const rules = await webRules(webUser);
                    permissions = rules.map(rule => rule.name);
                }
            }
            // invalid token
        } catch (e) {
            // invalid token
        }
    }

    return {
        req: request,
        res: response,
        hasPermission(permission: string) {
            return permissions.includes(permission);
        },
        getWebClient() {
            return webUser ? webUser.web_client_id : null;
        }
    }
}