const router = require("express").Router();
//const { check, validationResult } = require("express-validator");
const { Order } = require("../../config/conexion");

module.exports = {

    getOrders: async (req, res) => {
        const order = await Order.findAll();
        res.send(order);
    }
}