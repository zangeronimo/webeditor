import db from '../../../config/db';

const webRules = () => db('web_rule');
const webRule = (_, { filter }) => db('web_rule').where(filter).first();

export {
    webRules,
    webRule,
}