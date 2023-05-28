import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import db from "./src/config/Database.js";
import Users from "./src/models/UserModel.js";
import UserProfile from "./src/models/UserProfileModel.js";
import router from "./src/routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try{
    await db.authenticate();
    console.log('Database Successfuly Connected');
    await Users.sync(); //Automatically generate table if not exists
    await UserProfile.sync(); //Automatically generate table if not exists
} catch(error){
    console.error(error);
}

app.use(express.static(path.join(__dirname, 'public'))); // Menyajikan file statis
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // Origin aplikasi front-endnya
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));