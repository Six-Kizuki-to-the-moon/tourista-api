import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';
import { DestinationWisata } from './DestinationWisataModel.js';

export const DestinationDetail = db.define('destination_detail', {
  name_wisata: {
    type: DataTypes.STRING
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
  destination_long: {
    type: DataTypes.DOUBLE
  },
}, {
  freezeTableName: true,
  timestamps: false
});

// Added the relationship between DestinationDetail and DestinationWisata
DestinationDetail.belongsTo(DestinationWisata, { foreignKey: 'name_wisata', targetKey: 'name_wisata' });

export default DestinationDetail;
