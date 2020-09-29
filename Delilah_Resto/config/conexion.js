const sequelize = require('sequelize');
const ProductModel = require("./../models/product");
const UserModel = require("./../models/user");
const DataBase = new sequelize("delilahdb", "root", "12345", {
    host: "localhost",
    dialect: "mariadb"
});

DataBase.authenticate().then(() => {
    console.log('Conectado a la db exitosamente.');
}).catch(err => {
    console.error('Error de conexion:', err);
}).finally(() => {
    DataBase.close();
});

module.exports = { DataBase, sequelize }