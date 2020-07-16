import db from '@config/db';

const users = () => db('web_user');
const user = (_, { id }) => db('web_user').where({ id }).first();
const sayhello = () => "Hello World 2.0";

export = {
    users,
    user,
    sayhello,
}