const router = require("express").Router();
const userRoute = require("./routes/users");
const productRoute = require("./routes/products");
const orderRoute = require("./routes/orders");
/* const { check } = require("express-validator");
const { isAdmin, checkToken } = require("./middlewares");
const { getOrders, createOrder } = require("./api/orders");
const { userRegister, userLogin, userModify } = require("./api/users");
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require("./api/products"); */


router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/orders", orderRoute)

/* 
router.post("/users", [
    check("customer_name", "El usuario es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("phone_number", "El telefono es obligatorio").not().isEmpty(),
    check("address", "La dirección es obligatoria").not().isEmpty(),
], userRegister);
router.post("/users/login", userLogin);
router.put("/users", checkToken, userModify);


router.get("/products", checkToken, getAllProducts);
router.post("/products", isAdmin, [
    check("productName", "El nombre del producto es obligatorio").not().isEmpty(),
    check("price", "El precio del producto es obligatorio").not().isEmpty()
], createProduct);
router.put("/products/:productId", isAdmin, updateProduct);
router.delete("/products/:productId", isAdmin, deleteProduct);


router.get("/orders", getOrders);
router.post("/orders", createOrder);
 */



module.exports = router;