import db from '@config/db';
import { generatePassword } from '@resolvers/security';
import { client as getClient } from '@resolvers/Query/client';

const createClient = async (_, { data }) => {
    try {
        data.password = data.password ? data.password : generatePassword();
        return db('web_client').insert(data)
            .then(id => getClient(_, { filter: { id } }))
            .catch(e => new Error(e.sqlMessage));
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const updateClient = async (_, { filter, data }) => {
    try {
        const client = await getClient(_, { filter });
        if (client) {
            if (!data.password) { delete data.password; }
            const { id } = client;
            await db('web_client').where({ id }).update(data)
        }
        return !client ? null : { ...client, ...data };
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const deleteClient = async (_, { filter }) => {
    try {
        const client = await getClient(_, { filter });
        if (client) {
            const { id } = client;
            await db('web_client').where({ id }).delete();
        }

        return client;
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

export {
    createClient,
    updateClient,
    deleteClient,
}