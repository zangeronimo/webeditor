import db from '../../../config/db';

const webRules = (_, { }, ctx) => {
    const webClient = ctx.getWebClient();
    if (!webClient || !ctx.hasPermission('RULE_VIEW_WEBUSER')) {
        return new Error('access denied');
    }

    return db('web_rule');
}
const webRule = (_, { filter }, ctx) => {
    const webClient = ctx.getWebClient();
    if (!webClient || !ctx.hasPermission('RULE_SUPERADMIN')) {
        return new Error('access denied');
    }

    return db('web_rule').where(filter).first();
}

export {
    webRules,
    webRule,
}