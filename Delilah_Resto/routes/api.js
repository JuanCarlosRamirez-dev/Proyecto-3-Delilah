const router = require("express").Router();
const middlewares = require("./middlewares");
const apiProductsRouter = require("./api/products");
const apiOrdersRouter = require("./api/orders");
const { userRegister, userLogin, userModify } = require("./api/users");


/* User */
router.post("/users", userRegister);
router.post("/users/login", userLogin);
router.put("/users", userModify);

/* Products */
router.use("/products/:productId", middlewares.isAdmin, apiProductsRouter);
router.use("/products/product", middlewares.isAdmin, apiProductsRouter);
router.use("/products", middlewares.checkToken, apiProductsRouter);

/* Orders */
router.use("/orders", apiOrdersRouter);



module.exports = router;