import db from '@config/db';
import { generatePassword } from '@resolvers/security';
import { webClient as getWebClient } from '@resolvers/Query/System/webClient';

const createWebClient = async (_, { data }) => {
    try {
        data.password = data.password ? data.password : generatePassword();
        return db('web_client').insert(data)
            .then(id => getWebClient(_, { filter: { id } }))
            .catch(e => new Error(e.sqlMessage));
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const updateWebClient = async (_, { filter, data }) => {
    try {
        const webClient = await getWebClient(_, { filter });
        if (webClient) {
            if (!data.password) { delete data.password; }
            const { id } = webClient;
            await db('web_client').where({ id }).update(data)
        }
        return !webClient ? null : { ...webClient, ...data };
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const deleteWebClient = async (_, { filter }) => {
    try {
        const webClient = await getWebClient(_, { filter });
        if (webClient) {
            const { id } = webClient;
            await db('web_client').where({ id }).delete();
        }

        return webClient;
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

export {
    createWebClient,
    updateWebClient,
    deleteWebClient,
}