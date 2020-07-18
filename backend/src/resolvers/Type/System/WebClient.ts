import db from '@config/db';

module.exports = {
    webTools(WebClient) {
        return db('web_tool')
            .join(
                'web_client_has_web_tool',
                'web_tool.id',
                'web_client_has_web_tool.web_tool_id'
            ).where({ web_client_id: WebClient.id });
    },
    webUsers(WebClient) {
        return db('web_user').where({ web_client_id: WebClient.id });
    }
}