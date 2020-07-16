import db from '@config/db';

const clients = () => db('web_client');
const client = (_, { filter }) => db('web_client').where(filter).first();

export = {
    clients,
    client,
}