import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/Database.js';
import { DestinationWisata } from './DestinationWisataModel.js';
import { Umkm } from './UmkmModel.js';

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
  destination_lot: {
    type: DataTypes.DOUBLE
  },
  // umkm_id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   primaryKey: false,
  //   references: {
  //     model: Umkm,
  //     key: 'umkm_id'
  //   }
  // },
}, {
  freezeTableName: true,
  timestamps: false
});

// Added the relationship between DestinationDetail and DestinationWisata
DestinationDetail.belongsTo(DestinationWisata, { foreignKey: 'name_wisata', targetKey: 'name_wisata' });
// Added the relationship between DestinationDetail and Umkm
DestinationDetail.belongsTo(Umkm, { foreignKey: 'umkm_id', targetKey: 'umkm_id' });

export default DestinationDetail;
