
const router = require("express").Router();
const orderServices = require("../../services/order.service")

router.get("/", orderServices.getOrders)
router.post("/", orderServices.createOrders)


module.exports = router

/*
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
\} */