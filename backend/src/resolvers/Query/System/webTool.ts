import db from '../../../config/db';

const webTools = (_, { }, ctx) => {
    const webClient = ctx.getWebClient();
    if (!webClient || !ctx.hasPermission('RULE_SUPERADMIN')) {
        return new Error('access denied');
    }

    return db('web_tool');
}
const webTool = (_, { filter }, ctx) => {
    const webClient = ctx.getWebClient();
    if (!webClient || !ctx.hasPermission('RULE_SUPERADMIN')) {
        return new Error('access denied');
    }

    return db('web_tool').where(filter).first();
}

export {
    webTools,
    webTool,
}