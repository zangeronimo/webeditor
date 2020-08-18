import db from '../../../config/db';

const webClients = (_, { }, ctx) => {
    const webClient = ctx.getWebClient();
    if (!webClient || !ctx.hasPermission('RULE_SUPERADMIN')) {
        return new Error('access denied');
    }

    return db('web_client');
}
const webClient = (_, { filter }, ctx) => {
    const webClient = ctx.getWebClient();
    if (!webClient || !ctx.hasPermission('RULE_SUPERADMIN')) {
        return new Error('access denied');
    }

    return db('web_client').where(filter).first();
}

export {
    webClients,
    webClient,
}