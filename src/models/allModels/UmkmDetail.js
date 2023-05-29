import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';
import { Umkm } from './Umkm.js';

export const UmkmDetail = db.define('umkm_detail', {
  name_umkm: {
    type: DataTypes.STRING,
    unique: true
  },
  owner_umkm: {
    type: DataTypes.STRING
  },
  contact_number_umkm: {
    type: DataTypes.STRING
  },
  location_umkm: {
    type: DataTypes.STRING,
    unique: true
  },
  detail_umkm: {
    type: DataTypes.TEXT
  },
  photo_umkm: {
    type: DataTypes.STRING,
    unique: true
  },
}, {
  freezeTableName: true
});

// Added the relationship between UserProfile and Users
UmkmDetail.belongsTo(Umkm, { foreignKey: 'name_umkm', targetKey: 'name_umkm' });
UmkmDetail.belongsTo(Umkm, { foreignKey: 'location_umkm', targetKey: 'location_umkm' });
UmkmDetail.belongsTo(Umkm, { foreignKey: 'photo_umkm', targetKey: 'photo_umkm' });
UmkmDetail.removeAttribute('id');

export default UmkmDetail;
