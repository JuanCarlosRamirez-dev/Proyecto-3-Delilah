const router = require("express").Router();
//const { check, validationResult } = require("express-validator");
const { Order } = require("../../config/conexion");

router.get("/", async (req, res) => {

    const order = await Order.findAll();
    res.send(order);
});