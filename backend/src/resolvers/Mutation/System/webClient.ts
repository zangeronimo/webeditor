import db from '@config/db';
import { generatePassword } from '@resolvers/security';
import { webClient as getWebClient } from '@resolvers/Query/System/webClient';

const createWebClient = async (_, { data }) => {
    try {

        // Check if has webTools, save and remove then, only after create a client is possible add Tools.
        let webTools: [any]
        if (data.webTools) {
            webTools = data.webTools;

            // Remove webTools
            delete data.webTools
        }

        data.password = data.password ? data.password : generatePassword();
        return db('web_client').insert(data)
            .then(async id => {
                // Check if has webTools to update
                if (webTools) {
                    await setTools(id, webTools);
                }
                return getWebClient(_, { filter: { id } })
            })
            .catch(e => new Error(e.sqlMessage));
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const updateWebClient = async (_, { filter, data }) => {
    try {
        const webClient = await getWebClient(_, { filter });
        if (webClient) {

            // Check if has webTools to update
            if (data.webTools) {
                try {
                    await setTools(webClient.id, data.webTools)
                } catch (e) {
                    throw new Error(e.sqlMessage);
                }

                // Remove webTools
                delete data.webTools
            }

            if (!data.password) { delete data.password; }
            const { id } = webClient;
            await db('web_client').where({ id }).update(data)
        }
        return !webClient ? null : { ...webClient, ...data };
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const setTools = async (client: any, tools: [any]) => {
    //First empty all client tools
    await db('web_client_has_web_tool').where({ web_client_id: client }).delete();

    //Next iterate all tools and add to client
    try {
        tools.forEach(async tool => await db('web_client_has_web_tool').insert({ web_client_id: client, web_tool_id: tool.id }))
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