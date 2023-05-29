import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';

export const Trip = db.define('trip', {
  trip_name: {
    type: DataTypes.STRING,
    unique: true
  },
  trip_detail: {
    type: DataTypes.STRING
  },
  trip_image: {
    type: DataTypes.STRING
  },
  use_lodging: {
    type: DataTypes.BOOLEAN,
    unique: true
  }
}, {
  freezeTableName: true
});

export default Trip;
