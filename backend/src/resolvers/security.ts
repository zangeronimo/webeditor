import bcrypt from 'bcryptjs';

export const generatePassword = () => Math.random().toString(36).slice(-8);
export const hashPassword = (pass: string) => {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(pass, salt)
}