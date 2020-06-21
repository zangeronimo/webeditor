import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class WebUser extends Model {
    public name!: string;
    public email!: string;
    public password!: string;
    public active!: string;
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

export default WebUser;