import { Sequelize } from "sequelize";
//'Database','Database User','Database Password'
const db = new Sequelize('tourista_db','root','',{
    host: 'localhost',//host atau public ip dari Mysql Instance
    dialect: 'mysql', //DBMS nya, antara Mysql/Mongo/Postgree, tergantung nanti di GCP nya pakek apa
});

export default db;