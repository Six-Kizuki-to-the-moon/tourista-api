import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';
import { Trip } from './Trip.js';

export const DestinationWisata = db.define('destination_wisata', {
  trip_name: {
    type: DataTypes.STRING
  },
  name_wisata: {
    type: DataTypes.STRING
  },
  photo_wisata: {
    type: DataTypes.STRING
  },
  lokasi_wisata: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.DOUBLE
  },
}, {
  freezeTableName: true
});

// Added the relationship between UserProfile and Users
DestinationWisata.belongsTo(Trip, { foreignKey: 'trip_name', targetKey: 'trip_name' });

export default DestinationWisata;
