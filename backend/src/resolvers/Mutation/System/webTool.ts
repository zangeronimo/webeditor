import db from '../../../config/db';
import { webTool as getWebTool } from '../../Query/System/webTool';

const createWebTool = async (_, { data }, ctx) => {
    const webClient = ctx.getWebClient();
    if (!webClient || !ctx.hasPermission('RULE_SUPERADMIN')) {
        return new Error('access denied');
    }

    try {
        return db('web_tool').insert(data)
            .then(id => getWebTool(_, { filter: { id } }, ctx))
            .catch(e => new Error(e.sqlMessage));
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const updateWebTool = async (_, { filter, data }, ctx) => {
    const webClient = ctx.getWebClient();
    if (!webClient || !ctx.hasPermission('RULE_SUPERADMIN')) {
        return new Error('access denied');
    }

    try {
        const webTool = await getWebTool(_, { filter }, ctx);
        if (webTool) {
            const { id } = webTool;
            await db('web_tool').where({ id }).update(data)
        }
        return !webTool ? null : { ...webTool, ...data };
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const deleteWebTool = async (_, { filter }, ctx) => {
    const webClient = ctx.getWebClient();
    if (!webClient || !ctx.hasPermission('RULE_SUPERADMIN')) {
        return new Error('access denied');
    }

    try {
        const webTool = await getWebTool(_, { filter }, ctx);
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