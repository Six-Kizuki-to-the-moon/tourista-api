import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';

export const Users = db.define('user_account', {
  username: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  refresh_token: {
    type: DataTypes.TEXT
  }
}, {
  freezeTableName: true
});

export default Users;
