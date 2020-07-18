import db from '@config/db';
import { webTool as getWebTool } from '@resolvers/Query/System/webTool';

const createWebTool = async (_, { data }) => {
    try {
        return db('web_tool').insert(data)
            .then(id => getWebTool(_, { filter: { id } }))
            .catch(e => new Error(e.sqlMessage));
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const updateWebTool = async (_, { filter, data }) => {
    try {
        const webTool = await getWebTool(_, { filter });
        if (webTool) {
            const { id } = webTool;
            await db('web_tool').where({ id }).update(data)
        }
        return !webTool ? null : { ...webTool, ...data };
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const deleteWebTool = async (_, { filter }) => {
    try {
        const webTool = await getWebTool(_, { filter });
        if (webTool) {
            const { id } = webTool;
            await db('web_tool').where({ id }).delete();
        }

        return webTool;
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

export {
    createWebTool,
    updateWebTool,
    deleteWebTool,
}