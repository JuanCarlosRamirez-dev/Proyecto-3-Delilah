const router = require("express").Router();
const orderServices = require("../../services/order.service")

router.get("/", orderServices.getOrders)
router.post("/", orderServices.createOrders)


module.exports = router