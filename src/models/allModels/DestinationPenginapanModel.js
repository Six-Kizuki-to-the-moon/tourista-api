import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';
import { Trip } from './TripModel.js';

export const DestinationPenginapan = db.define('destination_penginapan', {
  name_penginapan: {
    type: DataTypes.STRING
  },
  penginapan_lat: {
    type: DataTypes.DOUBLE
  },
  penginapan_lot: {
    type: DataTypes.DOUBLE
  },
  penginapan_fee: {
    type: DataTypes.INTEGER
  },
}, {
  freezeTableName: true
});

// Added the relationship between DestinationPenginapan and Trip
// DestinationPenginapan.belongsTo(Trip, { foreignKey: 'use_lodging', targetKey: 'use_lodging' })

export default DestinationPenginapan;
