const users = [
    { id: 1, name: 'Luciano', email: 'zangeronimo@gmail.com' },
    { id: 2, name: 'Test', email: 'test@gmail.com' },
]

export default {
    Query: {
        users: () => users,
        user: (_, { id }) => {
            const user = users.filter(user => user.id == id)
            if (user.length === 1) {
                return user[0];
            }
        },
        sayhello: () => "Hello World 2.0"
    },

    Mutation: {
        createUser: (_, { name, email }) => {
            const user = { id: 3, name, email }
            if (users.filter(u => u.id === user.id).length === 0) {
                users.push(user);
                return user
            }
        }
    },
}