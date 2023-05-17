# JSON Web Token Authentication
Authentication System using Node.js, Express, MySQL &amp; JSON Web Tokens (JWT).

<h1 align="center">Welcome to jwt-auth-express 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/msandypr/jwt-auth-express/blob/master/README.md" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

> Authentication System using Node.js, Express, MySQL &amp; JSON Web Tokens (JWT).

### 🏠 [Homepage](https://github.com/msandypr/jwt-auth-express)

### ✨ [Demo](https://github.com/msandypr/jwt-auth-express/blob/master/README.md)

## Features :

* Get data from table
* Refresh Token
* Login user_account
* Register user_account
* Logout user_account

## Prerequisites and Technology

- [Express](https://expressjs.com/)
- [Mysql2](https://www.npmjs.com/package/mysql2)
- [Sequelize](https://sequelize.org/)
- [JSON Web Tokens](https://jwt.io/)
- [Dotenv](https://www.dotenv.org/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Cookie Parser](https://www.npmjs.com/package/cookie-parser)
- [CORS](https://www.npmjs.com/package/cors)
- [Nodemon](https://nodemon.io/)

## Installation

Firstly, you need to clone this repository using this following command :

```sh
git clone https://github.com/msandypr/jwt-auth-express.git
```

Then, open the project folder using cd jwt-auth-express, depends on your clone folder location, after that, you need to install dependency using this following command :

```sh
npm install or yarn install or pnpm install
```
## Run & Usages

After that, run the jwt-auth-express locally using nodemon, if you never install nodemon, you should install first using `npm install -g nodemon` or using `yarn global add nodemon` if you using yarn. If you already install nodemon, please use this following command :

```sh
nodemon index
```

This will run the application locally on `http://localhost:5000`. Dont forget to create database first on your local machine, db name is `auth_db` or change it by yourself in `config/Database.js`

## Documentation

### API Endpoints
This application run locally on `http://localhost:5000`
* `GET /users` = Get all users in user_account table
* `POST /users` = Add a users to regist in user_account
* `POST /login` = Login a users
* `GET /token` = Refresh a users token
* `DELETE /logout` = Logout an account

### Register
* URL
  - `/register`
  
* Method
  - `POST`
  
* Request Body, Content-Type: application/json
  - `username` as `STRING`
  - `email` as `STRING`
  - `password` as `STRING`
  - `confirmPassword` as `STRING`
  
* Response Format
  - If Response Success : `"msg": "Register Success!"`
  - If Email was Registered : `"msg": "Email already Registered!"`
  - If Password not match with Confirm Password : `"msg": "Password and Confirm Password doesn't match."`
  - If Response Fail : `"msg": "Forbidden"`
 
### Login
* URL
  - `/login`
  
* Method
  - `POST`
  
* Request Body, Content-Type: application/json
  - `email` as `STRING`
  - `password` as `STRING`
  
* Response Format
  - `BLANK`

### Get-User
* URL
  - `/users`
  
* Method
  - `GET`
  
* Request Body, Content-Type: application/json
  - `BLANK`
  
* Response Format
  - `BLANK`

### Ref-Token
* URL
  - `/token`
  
* Method
  - `GET`
  
* Request Body, Content-Type: application/json
  - `BLANK`
  
* Response Format
  - `BLANK`

### Logout
* URL
  - `/logout`
  
* Method
  - `DELETE`
  
* Request Body, Content-Type: application/json
  - `BLANK`
  
* Response Format
  - `BLANK`


## Author

```sh
Uppermoon Demon (Six Kizuki)
```

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 Six Kizuki .<br />
This project is [GNU General Public License](https://github.com/msandypr/jwt-auth-express/blob/master/LICENSE).
***
