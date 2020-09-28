const router = require("express").Router();
//const middlewares = require("./middlewares");
const apiProductsRouter = require("./api/products");
const apiUsersRouter = require("./api/users");


//router.use("/movies", middlewares.checkToken, apiMoviesRouter);
router.use("/products", apiProductsRouter);
router.use("/users", apiUsersRouter);

module.exports = router;