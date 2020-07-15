import db from '@config/db';

const users = () => db('users');
const user = (_, { id }) => db('users').where({ id }).first();
const sayhello = () => "Hello World 2.0";

export = {
    users,
    user,
    sayhello,
}