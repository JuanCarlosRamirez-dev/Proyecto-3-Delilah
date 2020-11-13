const sequelize = require("../api/config/conexion")
const jwt = require("jwt-simple");
const moment = require("moment");

async function getAllOrders(req, res) {

}

async function getSingleOrder(req, res) {

}

async function getUserOrder(req, res) {

}

async function createOrder(req, res) {
    try {

        const userToken = req.headers["user-token"]
        let payload = {}
        payload = jwt.decode(userToken, "secreto")
        const userId = payload.usuarioId
        const createdAt = moment().format('l')
        const updatedAt = moment().format('l')

        const newOrder = await sequelize.query(`INSERT INTO orders (id_user,createdAt,updatedAt) VALUES (${userId},${createdAt},${updatedAt})`)
        res.send(newOrder)

    } catch (error) {
        res.send("Error: " + error)
    }
}

async function updateOrder(req, res) {

}

async function deleteOrder(req, res) {

}

module.exports = {
    getAllOrders,
    getSingleOrder,
    createOrder,
    getUserOrder,
    updateOrder,
    deleteOrder
}