import db from '../../../config/db';

const webUsers = (_, { }, ctx) => {
    if (!ctx.getWebClient()) {
        return new Error('access denied');
    }
    const webUser = db('web_user');
    return webUser;
}
const webUser = (_, { filter }) => {
    return db('web_user').where(filter).first();
}

export {
    webUsers,
    webUser,
}