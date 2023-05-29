import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';
import UserProfile from './UserProfileModel.js';
import DestinationPenginapan from './DestinationPenginapanModel.js';

export const ReviewPenginapan = db.define('review_penginapan', {
  user_penginapan: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: false,
    references: {
      model: UserProfile,
      key: 'id'
    }
  },
  penginapan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: false,
    references: {
      model: DestinationPenginapan,
      key: 'id'
    }
  },
  penginapan_rating: {
    type: DataTypes.DOUBLE
  },
}, {
  freezeTableName: true,
  timestamps: false,
  primaryKey: false
});

// Added the relationship between ReviewPenginapan and UserProfile
ReviewPenginapan.belongsTo(UserProfile, { foreignKey: 'user_penginapan', targetKey: 'id' });
// Added the relationship between ReviewPenginapan and DestinationPenginapan
ReviewPenginapan.belongsTo(DestinationPenginapan, { foreignKey: 'penginapan_id', targetKey: 'id' });
ReviewPenginapan.removeAttribute('id');

export default ReviewPenginapan;
