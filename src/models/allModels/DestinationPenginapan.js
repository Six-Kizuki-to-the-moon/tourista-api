import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';
import { Trip } from './Trip.js';

export const DestinationPenginapan = db.define('destination_penginapan', {
  use_lodging: {
    type: DataTypes.BOOLEAN
  },
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

DestinationPenginapan.belongsTo(Trip, { foreignKey: 'use_lodging', targetKey: 'use_lodging' })

export default DestinationPenginapan;
