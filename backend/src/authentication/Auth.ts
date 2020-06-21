export default class Auth {
    basicUser: string;
    basicPass: string;
    Username: string;
    Password: string;

    // This basic authentication is a first security layer, all requisitions  for authentication need to know the basic user and basic pass.
    checkBasicLogin(): boolean {
        const checkBasicUser = process.env.BASIC_USER || '123' === this.basicUser;
        const checkBasicPass = process.env.BASIC_PASS || '123' === this.basicPass;

        if (checkBasicUser && checkBasicPass) {
            return true;
        }

        return false;
    }
}