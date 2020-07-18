import db from '@config/db';

const createUser = async (_, { name, email, password }) => {
    const user = { name, email, password };
    try {
        return db('web_user').insert(user)
            .then(id => db('web_user').where({ id }).first())
            .catch(e => new Error(e.sqlMessage));
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

export {
    createUser,
}