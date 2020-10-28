const sequelize = require("../api/config/conexion")
const jwt = require("jwt-simple");
const moment = require("moment");

async function getOrders(req, res) {
    //const order = await Order.findAll();
    res.send(order);
}

async function createOrders(req, res) {
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

module.exports = { getOrders, createOrders }