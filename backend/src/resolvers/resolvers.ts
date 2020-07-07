import db from '@config/db'

export default {
    Query: {
        users: () => db('users'),
        user: (_, { id }) => db('users').where({ id }).first(),
        sayhello: () => "Hello World 2.0"
    },

    Mutation: {
        createUser: (_, { name, email }) => {
            const user = { name, email };
            return db('users').insert(user)
                .then(id => db('users').where({ id }).first())
        }
    },
}