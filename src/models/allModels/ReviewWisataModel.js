import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';
import UserProfile from './UserProfileModel.js';
import { Destination } from './DestinationModel.js';

export const ReviewWisata = db.define('review_wisata', {
  user_wisata: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    references: {
      model: UserProfile,
      key: 'id'
    }
  },
  wisata_id: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    references: {
      model: Destination,
      key: 'id'
    }
  },
  wisata_rating: {
    type: DataTypes.DOUBLE
  },
}, {
  freezeTableName: true,
  timestamps: false,
  primaryKey: false
});

// Added the relationship between ReviewWisata and UserProfile
ReviewWisata.belongsTo(UserProfile, { foreignKey: 'user_wisata', targetKey: 'id' });
// Added the relationship between Review and DestinationDetail
ReviewWisata.belongsTo(Destination, { foreignKey: 'wisata_id', targetKey: 'id' });
ReviewWisata.removeAttribute('id');

export default ReviewWisata;
