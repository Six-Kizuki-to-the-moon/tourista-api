import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';
import { Trip } from './TripModel.js';

export const DestinationWisata = db.define('destination_wisata', {
  trip_name_type: {
    type: DataTypes.STRING
  },
  name_wisata: {
    type: DataTypes.STRING,
    unique: true
  },
}, {
  freezeTableName: true
});

// Added the relationship between DestinationWisata and Trip
DestinationWisata.belongsTo(Trip, { foreignKey: 'trip_name_type', targetKey: 'trip_name' });

export default DestinationWisata;
