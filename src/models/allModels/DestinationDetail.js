import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';
import { DestinationWisata } from './DestinationWisata.js';

export const DestinationDetail = db.define('destination_detail', {
  name_wisata: {
    type: DataTypes.STRING,
    unique: true
  },
  description_wisata: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
  destination_photo: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.DOUBLE
  },
  rating: {
    type: DataTypes.DOUBLE
  },
  time_minutes: {
    type: DataTypes.DOUBLE
  },
  coordinate: {
    type: DataTypes.STRING
  },
  destination_lat: {
    type: DataTypes.DOUBLE
  },
  destination_lot: {
    type: DataTypes.DOUBLE
  },
  umkm: {
    type: DataTypes.STRING
  },
}, {
  freezeTableName: true
});

// Added the relationship between UserProfile and Users
DestinationDetail.belongsTo(DestinationWisata, { foreignKey: 'name_wisata', targetKey: 'name_wisata' });

export default DestinationDetail;
