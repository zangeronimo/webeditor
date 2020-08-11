import db from '../../../config/db';

const webClients = () => db('web_client');
const webClient = (_, { filter }) => db('web_client').where(filter).first();

export {
    webClients,
    webClient,
}