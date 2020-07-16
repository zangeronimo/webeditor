import db from '@config/db';

const users = () => db('web_user');
const user = (_, { filter }) => db('web_user').where(filter).first();
const sayhello = () => "Hello World 2.0";

export = {
    users,
    user,
    sayhello,
}