import db from '@config/db';

const webUsers = () => db('web_user');
const webUser = (_, { filter }) => db('web_user').where(filter).first();

export {
    webUsers,
    webUser,
}