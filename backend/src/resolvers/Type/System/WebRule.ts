import db from '../../../config/db';

module.exports = {
    webTool(WebRule) {
        return db('web_tool').where({ id: WebRule.web_tool_id }).first();
    },
    webUsers(WebRule) {
        return db('web_user')
            .join(
                'web_user_has_web_rule',
                'web_user.id',
                'web_user_has_web_rule.web_user_id'
            ).where({ web_rule_id: WebRule.id });
    }
}