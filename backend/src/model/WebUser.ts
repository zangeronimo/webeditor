import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import WebClient from './WebClient';

class WebUser extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public active!: string;
    public web_client_id!: number;
}

WebUser.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, { sequelize, tableName: 'web_user' });

WebUser.belongsTo(WebClient, { targetKey: 'id', foreignKey: 'web_client_id' });

export default WebUser;