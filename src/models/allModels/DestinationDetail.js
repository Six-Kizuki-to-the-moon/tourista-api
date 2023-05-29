import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';
import { DestinationWisata } from './DestinationWisata.js';
import { Umkm } from './Umkm.js';

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
//   umkm_on_destination: {
//     type: DataTypes.STRING,
//     unique: true
//   },
}, {
  freezeTableName: true
});

// Added the relationship between UserProfile and Users
DestinationDetail.belongsTo(DestinationWisata, { foreignKey: 'name_wisata', targetKey: 'name_wisata' });
// DestinationDetail.belongsTo(Umkm, { foreignKey: 'umkm_on_destination', targetKey: 'name_umkm' });

export default DestinationDetail;
