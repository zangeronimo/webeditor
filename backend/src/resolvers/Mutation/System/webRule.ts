import db from '@config/db';
import { webRule as getWebRule } from '@resolvers/Query/System/webRule';

const createWebRule = async (_, { data }) => {
    try {
        // Convert webTool in a web_tool_id and delete webTool in the data structure.
        data.web_tool_id = data.webTool.id;
        delete data.webTool;

        return db('web_rule').insert(data)
            .then(id => getWebRule(_, { filter: { id } }))
            .catch(e => new Error(e.sqlMessage));
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const updateWebRule = async (_, { filter, data }) => {
    try {
        // Convert webTool in a web_tool_id and delete webTool in the data structure.
        data.web_tool_id = data.webTool.id;
        delete data.webTool;

        const webRule = await getWebRule(_, { filter });
        if (webRule) {
            const { id } = webRule;
            await db('web_rule').where({ id }).update(data)
        }
        return !webRule ? null : { ...webRule, ...data };
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

const deleteWebRule = async (_, { filter }) => {
    try {
        const webRule = await getWebRule(_, { filter });
        if (webRule) {
            const { id } = webRule;
            await db('web_rule').where({ id }).delete();
        }

        return webRule;
    } catch (e) {
        throw new Error(e.sqlMessage);
    }
}

export {
    createWebRule,
    updateWebRule,
    deleteWebRule,
}