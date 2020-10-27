require("dotenv/config");
const Sequelize = require('sequelize');

const DATABASE = process.env.DB_NAME;
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const HOST = process.env.DB_HOST;
const DIALECT = process.env.DB_DIALECT;

module.exports = new Sequelize(DATABASE, USER, PASS, {
    host: HOST,
    dialect: DIALECT
});