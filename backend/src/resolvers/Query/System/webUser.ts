import db from '../../../config/db';

const webUsers = (_, { }, ctx) => {
    const webClient = ctx.getWebClient();
    if (!webClient || !ctx.hasPermission('RULE_VIEW_WEBUSER')) {
        return new Error('access denied');
    }
    const webUser = db('web_user').where({ web_client_id: webClient });
    return webUser;
}
const webUser = (_, { filter }, ctx) => {
    const webClient = ctx.getWebClient();
    if (!webClient || !ctx.hasPermission('RULE_VIEW_WEBUSER')) {
        return new Error('access denied');
    }
    filter.web_client_id = webClient;

    return db('web_user').where(filter).first();
}

export {
    webUsers,
    webUser,
}