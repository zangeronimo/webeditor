import db from '../../../config/db';

const webClient = (WebUser) => {
    return db('web_client').where({ id: WebUser.web_client_id }).first();
}

const webRules = (WebUser) => {
    return db('web_rule')
        .join(
            'web_user_has_web_rule',
            'web_rule.id',
            'web_user_has_web_rule.web_rule_id'
        ).where({ web_user_id: WebUser.id });
}

export {
    webClient,
    webRules,
}