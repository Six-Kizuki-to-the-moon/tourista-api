import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';
import { Users } from './UserModel.js';

export const UserProfile = db.define('user_profile', {
  username: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.INTEGER
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

// Added the relationship between UserProfile and Users
UserProfile.belongsTo(Users, { foreignKey: 'email', targetKey: 'email' });
UserProfile.belongsTo(Users, { foreignKey: 'username', targetKey: 'username' });

export default UserProfile;
