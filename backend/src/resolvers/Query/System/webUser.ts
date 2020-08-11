import db from '../../../config/db';

const webUsers = (_, { }) => {
    const webUser = db('web_user');
    return webUser;
}
const webUser = (_, { filter }) => db('web_user').where(filter).first();

export {
    webUsers,
    webUser,
}