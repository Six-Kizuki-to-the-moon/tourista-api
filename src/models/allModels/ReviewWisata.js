import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';
import UserProfile from './UserProfileModel.js';
import DestinationDetail from './DestinationDetail.js';

export const ReviewWisata = db.define('review_wisata', {
  user_wisata: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: false,
    references: {
      model: UserProfile,
      key: 'id'
    }
  },
  wisata_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: false,
    references: {
      model: DestinationDetail,
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

ReviewWisata.belongsTo(UserProfile, { foreignKey: 'user_wisata', targetKey: 'id' });
ReviewWisata.belongsTo(DestinationDetail, { foreignKey: 'wisata_id', targetKey: 'id' });
ReviewWisata.removeAttribute('id');

export default ReviewWisata;
