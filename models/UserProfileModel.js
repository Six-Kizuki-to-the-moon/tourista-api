import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js"; // Import model User, untuk Foreign Key.

const { DataTypes } = Sequelize;

const UserProfile = db.define('user_profile', {
    name: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'email'
        }
    },
    photo_profile: {
        type: DataTypes.STRING
    },
    user_lat: {
        type: DataTypes.DOUBLE
    },
    user_lot: {
        type: DataTypes.DOUBLE
    }
}, {
    freezeTableName: true
});

UserProfile.belongsTo(User, {
    foreignKey: 'email',
    targetKey: 'email'
});

export default UserProfile;
