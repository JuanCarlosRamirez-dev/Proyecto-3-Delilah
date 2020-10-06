const router = require("express").Router();
//const { check, validationResult } = require("express-validator");
const { Order } = require("../../config/conexion");

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