import { Sequelize } from 'sequelize';
import WebUser from '../model/WebUser';
const dbConfig = require('@config/database');

const connection = new Sequelize(dbConfig);

export default connection;