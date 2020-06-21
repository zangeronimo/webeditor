import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import WebUser from '@model/WebUser';

class Auth {

    basicUser: string;
    basicPass: string;
    Username: string;
    Password: string;

    payload = {
        id: null,
        name: "",
        email: ""
    }

    // This basic authentication is a first security layer, all requisitions  for authentication need to know the basic user and basic pass.
    checkBasicLogin(): boolean {
        const checkBasicUser = process.env.BASIC_USER || '123' === this.basicUser;
        const checkBasicPass = process.env.BASIC_PASS || '123' === this.basicPass;

        if (checkBasicUser && checkBasicPass) {
            return true;
        }

        return false;
    }

    generateToken(): string {
        const token = jwt.sign(this.payload, process.env.SECRET, {
            expiresIn: 60
        })

        return token;
    }

    async login(req: Request, res: Response) {
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        const auth: Auth = new Auth();
        auth.basicUser = username;
        auth.basicPass = password;

        if (auth.checkBasicLogin()) {
            const user = await WebUser.findOne<WebUser>({
                where: {
                    email: req.body.user,
                    active: true
                }
            });

            if (user !== null && (req.body.pwd === user.password)) {
                auth.payload = { id: user.id, name: user.name, email: user.email };
                var token = auth.generateToken();
                return res.json({ auth: true, token: token });
            }
        }

        return res.status(500).json({ message: 'invalid authentication!' });
    }
}
export default new Auth;