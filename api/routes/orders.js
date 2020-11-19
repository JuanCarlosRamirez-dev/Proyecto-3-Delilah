const router = require("express").Router();
const orderServices = require("../../services/order.service")

router.get("/", orderServices.getAllOrders)
router.get("/", orderServices.getSingleOrder)
router.post("/", orderServices.createOrder)


module.exports = router