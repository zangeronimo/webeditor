import db from '@config/db';

const createUser = async (_, { name, email }) => {
    const user = { name, email };
    try {
        return db('users').insert(user)
            .then(id => db('users').where({ id }).first())
            .catch(e => new Error(e.sqlMessage));
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

export = {
    createUser,
}