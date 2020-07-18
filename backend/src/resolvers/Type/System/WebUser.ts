import db from '@config/db';

module.exports = {
    webClient(WebUser) {
        return db('web_client').where({ id: WebUser.web_client_id }).first();
    }
}