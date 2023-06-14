import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';
import { Trip } from './TripModel.js';
import { UserProfile } from './UserProfileModel.js';
import { Destination } from './DestinationModel.js';


export const TripDetail = db.define('trip_detail', {
  user_id: {
    type: DataTypes.INTEGER,
  },
  trip_name_type: {
    type: DataTypes.STRING
  },
  name_wisata: {
    type: DataTypes.STRING
  },
  visited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE
  },
}, {
  freezeTableName: true,
  primaryKey: false,
  timestamps: false
});

// Added the relationship between DestinationWisata and Trip
TripDetail.belongsTo(Trip, { foreignKey: 'trip_name_type', targetKey: 'trip_name' });
TripDetail.belongsTo(UserProfile, { foreignKey: 'user_id', targetKey: 'id' });
TripDetail.belongsTo(Destination, { foreignKey: 'name_wisata', targetKey: 'name_wisata' });
TripDetail.removeAttribute('id');

export default TripDetail;
