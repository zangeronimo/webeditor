import db from '@config/db';

module.exports = {
    webClients(WebTool) {
        return db('web_client')
            .join(
                'web_client_has_web_tool',
                'web_client.id',
                'web_client_has_web_tool.web_client_id'
            ).where({ web_tool_id: WebTool.id });
    },
    webRules(WebTool) {
        return db('web_rule').where({ web_tool_id: WebTool.id });
    }
}