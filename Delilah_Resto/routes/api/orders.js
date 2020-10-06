
const Sequelize = require('sequelize');
const sequelize = new Sequelize("delilahdb", "root", "12345", {
    host: "localhost",
    dialect: "mariadb"
});
const { Order } = require("../../config/conexion");
const jwt = require("jwt-simple");


module.exports = {

    getOrders: async (req, res) => {
        const order = await Order.findAll();
        res.send(order);
    }


}