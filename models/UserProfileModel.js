import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/Database.js';
import { Users } from './UserModel.js';

export const UserProfile = db.define('user_profile', {
  name: {
    type: DataTypes.STRING
  },
  phone_number: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  photo_profile: {
    type: DataTypes.STRING
  },
  user_lat: {
    type: DataTypes.DOUBLE
  },
  user_lot: {
    type: DataTypes.DOUBLE
  }
}, {
  freezeTableName: true
});

UserProfile.belongsTo(Users, { foreignKey: 'email', targetKey: 'email' });

export default UserProfile;
