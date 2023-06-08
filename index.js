// APIs Configuration and Libraries
import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import db from "./src/config/Database.js";
import router from "./src/routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

//Database Models
import Users from "./src/models/allModels/UserModel.js";
import UserProfile from "./src/models/allModels/UserProfileModel.js";
import Trip from "./src/models/allModels/TripModel.js";
import DestinationPenginapan from "./src/models/allModels/DestinationPenginapanModel.js";
import Umkm from "./src/models/allModels/UmkmModel.js";
import { Destination } from "./src/models/allModels/DestinationModel.js";
import ReviewPenginapan from "./src/models/allModels/ReviewPenginapanModel.js";
import ReviewWisata from "./src/models/allModels/ReviewWisataModel.js";
import UmkmDetail from "./src/models/allModels/UmkmDetailModel.js";
import { TripDetail } from "./src/models/allModels/TripDetailModel.js";



dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try{
    await db.authenticate();
    console.log('Database Successfuly Connected');
    await Users.sync(); //Automatically generate table if not exists
    await UserProfile.sync(); //Automatically generate table if not exists
    await Trip.sync(); //Automatically generate table if not exists
    // await Umkm.sync(); //Automatically generate table if not exists
    await Destination.sync(); //Automatically generate table if not exists
    await TripDetail.sync(); //Automatically generate table if not exists
    await ReviewWisata.sync(); //Automatically generate table if not exists
    await DestinationPenginapan.sync(); //Automatically generate table if not exists
    await ReviewPenginapan.sync(); //Automatically generate table if not exists
    // await UmkmDetail.sync(); //Automatically generate table if not exists
} catch(error){
    console.error(error);
}

app.use(express.static(path.join(__dirname, 'public'))); // Serves static files for Homepage Documentation
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // For relaxing security the security applied in API, so you can access the API through client
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));