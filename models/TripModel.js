import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Trip = db.define('trip', {
    trip_name: {
        type: DataTypes.STRING
    },
    trip_detail: {
        type: DataTypes.STRING
    },
    trip_image: {
        type: DataTypes.STRING
    },
    using_lodging: {
        type: DataTypes.BOOLEAN
    }

}, {
    freezeTableName: true
});

export default Trip;