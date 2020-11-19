const sequelize = require("../api/config/conexion")
const jwt = require("jwt-simple");
const moment = require("moment");
const orderQueries = require("../dal/repositories/order.repository")

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
        const userId = payload.customerId
        const {
            paymentId,
            inOrder
        } = req.body

        const newOrder = await sequelize.query(orderQueries.createOrderQuery(paymentId, userId))
        res.json({
            success: "Orden creada"
        })
    } catch (error) {
        res.status(403).json("Type of error: " + error)
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