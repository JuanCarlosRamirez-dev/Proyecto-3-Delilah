const router = require("express").Router();
const { check } = require("express-validator");
const { isAdmin, checkToken } = require("./middlewares");
const { getOrders } = require("./api/orders");
const { userRegister, userLogin, userModify } = require("./api/users");
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require("./api/products");


/* User */
router.post("/users", [
    check("name", "El usuario es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("telephone", "El telefono es obligatorio").not().isEmpty(),
    check("address", "La dirección es obligatoria").not().isEmpty(),
], userRegister);
router.post("/users/login", userLogin);
router.put("/users", checkToken, userModify);

/* Products */
router.get("/products", checkToken, getAllProducts);
router.post("/products", isAdmin, [
    check("productName", "El nombre del producto es obligatorio").not().isEmpty(),
    check("price", "El precio del producto es obligatorio").not().isEmpty()
], createProduct);
router.put("/products/:productId", isAdmin, updateProduct);
router.delete("/products/:productId", isAdmin, deleteProduct);

/* Orders */
router.get("/orders", getOrders);


module.exports = router;