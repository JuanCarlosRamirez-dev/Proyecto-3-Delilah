const router = require("express").Router();
const middlewares = require("./middlewares");
const apiProductsRouter = require("./api/products");
const apiUsersRouter = require("./api/users");


/* User */
router.use("/users", apiUsersRouter);

/* Products */
router.use("/products/:productId", middlewares.isAdmin, apiProductsRouter);
router.use("/products/product", middlewares.isAdmin, apiProductsRouter);
router.use("/products", middlewares.checkToken, apiProductsRouter);

/* Orders */


module.exports = router;