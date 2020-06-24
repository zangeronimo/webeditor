import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class WebClient extends Model {
    public id!: number;
    public name!: string;
    public active!: string;
}

WebClient.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, { sequelize, tableName: 'web_client' });

export default WebClient;