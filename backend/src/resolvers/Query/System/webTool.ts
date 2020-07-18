import db from '@config/db';

const webTools = () => db('web_tool');
const webTool = (_, { filter }) => db('web_tool').where(filter).first();

export {
    webTools,
    webTool,
}