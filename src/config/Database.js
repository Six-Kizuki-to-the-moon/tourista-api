import { Sequelize } from "sequelize";
//'Database','Database User','Database Password'
const db = new Sequelize('tourista_db','root','7b0d345c653dd8a54ccb286c10f575d1',{ //Buat terlebih dahulu databsenya dengan nama 'tourista_db'
    host: '34.101.200.187',//host atau public ip dari Mysql Instance
    dialect: 'mysql', //DBMS nya, antara Mysql/Mongo/Postgree, tergantung nanti di GCP nya pakek apa
});

export default db;