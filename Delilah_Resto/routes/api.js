const router = require("express").Router();
const middlewares = require("./middlewares");
const apiProductsRouter = require("./api/products");
const apiUsersRouter = require("./api/users");
const apiOrdersRouter = require("./api/orders");


/* User */
//router.use("/users/:userId", middlewares.checkToken, apiUsersRouter);
router.use("/users", apiUsersRouter);

/* Products */
router.use("/products/:productId", middlewares.isAdmin, apiProductsRouter);
router.use("/products/product", middlewares.isAdmin, apiProductsRouter);
router.use("/products", middlewares.checkToken, apiProductsRouter);

/* Orders */
router.use("/orders", apiOrdersRouter);



module.exports = router;