require('dotenv').config();

module.exports ={
    "development": {
      "username": "postgres",
      "password": process.env.DB_PASSWORD,
      "database": "memoApp",
      "host": "127.0.0.1",
      "dialect": "postgres",
      "port":5432,
      "operatorsAliases": false
    },
    "test": {
      "username": "postgres",
      "password": process.env.DB_PASSWORD,
      "database": "memoApp",
      "host": "127.0.0.1",
      "dialect": "postgres",
      "port":5432,
      "operatorsAliases": false
    },
    "production": {
      "username": "postgres",
      "password": process.env.DB_PASSWORD,
      "database": "memoApp",
      "host": "127.0.0.1",
      "dialect": "postgres",
      "port":5432,
      "operatorsAliases": false
    }
  }
