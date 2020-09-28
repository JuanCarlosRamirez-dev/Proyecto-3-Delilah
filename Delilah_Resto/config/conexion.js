const Sequelize = require('sequelize');
const ProductModel = require("./../models/product");
const UserModel = require("./../models/user");
const sequelize = new Sequelize("delilahdb", "root", "12345", {
    host: "localhost",
    dialect: "mariadb"
});

const Product = ProductModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
    console.info("Conectado a la base de datos");
}).catch(console.error);

module.exports = {
    User,
    Product
}