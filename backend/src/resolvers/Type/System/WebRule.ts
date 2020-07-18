import db from '@config/db';

module.exports = {
    webTool(WebRule) {
        return db('web_tool').where({ id: WebRule.web_tool_id }).first();
    }
}