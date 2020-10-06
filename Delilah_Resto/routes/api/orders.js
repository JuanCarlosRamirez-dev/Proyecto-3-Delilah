
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
    },

    createOrder: async (req, res) => {
        try {

            const userToken = req.headers["user-token"]
            let payload = {}
            payload = jwt.decode(userToken, "secreto")
            const userId = payload.usuarioId

            const newOrder = await sequelize.query(`INSERT INTO orders ( id_user) VALUES ( ${userId})`)
            res.send(newOrder)
        }
        catch (error) { res.send("Error: " + error) }
    }
}