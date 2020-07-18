import db from '@config/db';
import { webUser as getWebUser } from '@resolvers/Query/System/webUser';

const createWebUser = async (_, { data }) => {
    try {
        return db('web_user').insert(data)
            .then(id => getWebUser(_, { filter: { id } }))
            .catch(e => new Error(e.sqlMessage));
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const updateWebUser = async (_, { filter, data }) => {
    try {
        const webUser = await getWebUser(_, { filter });
        if (webUser) {
            const { id } = webUser;
            await db('web_user').where({ id }).update(data)
        }
        return !webUser ? null : { ...webUser, ...data };
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const deleteWebUser = async (_, { filter }) => {
    try {
        const webUser = await getWebUser(_, { filter });
        if (webUser) {
            const { id } = webUser;
            await db('web_user').where({ id }).delete();
        }

        return webUser;
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}


export {
    createWebUser,
    updateWebUser,
    deleteWebUser,
}