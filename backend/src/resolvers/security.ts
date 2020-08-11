import bcrypt from 'bcryptjs';

export const generatePassword = () => Math.random().toString(36).slice(-8);
export const hashPassword = (pass: string) => {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(pass, salt)
}
export const checkPassword = async (pass: string, hash: string) => {
    return await bcrypt.compare(pass, hash);
}
export const hasRuleView = async (webUser: string) => {
    console.log(webUser);
}