const Sequelize = require('sequelize');
const sequelize = new Sequelize("delilahdb", "root", "12345", {
    host: "localhost",
    dialect: "mariadb"
});
const jwt = require("jwt-simple");
const moment = require("moment");

module.exports = {

    getOrders: async (req, res) => {
        //const order = await Order.findAll();
        res.send(order);
    },

    createOrder: async (req, res) => {
        try {

            const userToken = req.headers["user-token"]
            let payload = {}
            payload = jwt.decode(userToken, "secreto")
            const userId = payload.usuarioId
            //WTF!?
            const createdAt = moment().format('l')
            const updatedAt = moment().format('l')
            const newOrder = await sequelize.query(`INSERT INTO orders (id_user,createdAt,updatedAt) VALUES (${userId},${createdAt},${updatedAt})`)
            res.send(newOrder)

        }
        catch (error) { res.send("Error: " + error) }
    }
}