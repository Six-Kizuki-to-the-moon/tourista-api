import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';

export const Umkm = db.define('umkm', {
  umkm_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name_umkm: {
    type: DataTypes.STRING,
    unique: true
  },
  location_umkm: {
    type: DataTypes.STRING,
    unique: true
  },
  photo_umkm: {
    type: DataTypes.STRING,
    unique: true
  },
}, {
  freezeTableName: true
});

export default Umkm;
