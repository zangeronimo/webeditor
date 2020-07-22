import jwt from 'jsonwebtoken';

export default async ({ request, response }) => {
    const auth = request.headers.authorization;
    const token = auth && auth.substring(7);

    let webUser = null;

    if (token) {
        try {
            let contentToken = jwt.decode(token);
            if (new Date(contentToken['exp'] * 1000) > new Date()) {
                webUser = contentToken
            }
        } catch (e) {
            // token inválido
        }
    }

    // if (usuario && usuario.perfis) {
    //     admin = usuario.perfis.includes('admin')
    // }

    const err = new Error('Acesso negado!')

    return {
        req: request,
        res: response,
        webUser,
        ckechUser() {
            if (!webUser) throw err
        }
    }
}