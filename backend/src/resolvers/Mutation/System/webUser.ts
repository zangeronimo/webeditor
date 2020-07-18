import db from '@config/db';
import { hashPassword } from '@resolvers/security';
import { webUser as getWebUser } from '@resolvers/Query/System/webUser';

const createWebUser = async (_, { data }) => {
    try {
        if (!data.password) {
            return new Error('password is required');
        }

        // Cript the password
        data.password = hashPassword(data.password);

        // Convert webClient in a web_client_id and delete webClient in the data structure.
        data.web_client_id = data.webClient.id;
        delete data.webClient;

        return db('web_user').insert(data)
            .then(id => getWebUser(_, { filter: { id } }))
            .catch(e => new Error(e.sqlMessage));
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const updateWebUser = async (_, { filter, data }) => {
    try {
        // Check if has a password and cript then
        if (data.password) {
            data.password = hashPassword(data.password);
        }

        // Convert webClient in a web_client_id and delete webClient in the data structure.
        data.web_client_id = data.webClient.id;
        delete data.webClient;

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