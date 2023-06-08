import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';

export const Destination = db.define('destination', {
  name_wisata: {
    type: DataTypes.STRING,
    unique: true,
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

export default Destination;
