import { Sequelize } from "sequelize";
//'Database','Database User','Database Password'
const db = new Sequelize('tourista_db','root','',{ //Buat terlebih dahulu databsenya dengan nama 'tourista_db'
    host: process.env.HOST,//host atau public ip dari Mysql Instance
    dialect: 'mysql', //DBMS nya, antara Mysql/Mongo/Postgree, tergantung nanti di GCP nya pakek apa
});

export default db;