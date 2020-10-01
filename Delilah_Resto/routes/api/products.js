const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { Product } = require("../../config/conexion");


/* Endpoint para obtener informacion de los productos existentes */
router.get("/", async (req, res) => {
    const product = await Product.findAll();
    res.send(product);
});

/* Endpoint para crear un producto */
router.post('/product', async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(404).json({ errores: errors.array() });

    const productExist = await Product.findOne({ where: { productName: req.body.productName } })

    if (productExist) {
        res.json({ error: "El producto ya existe." })
    } else {
        const product = await Product.create(req.body)
        res.json({ success: "Producto creado con éxito: ", product })
    }
})

/* Enpoint para actualizar un producto */
router.put('/:productId', async (req, res) => {
    await Product.update(req.body, {
        where: { id: req.params.productId }
    })
    res.json({ success: "Producto actualizado." })
})

/* Endpoint para eliminar un producto */
router.delete('/:productId', async (req, res) => {
    await Product.destroy({
        where: { id: req.params.productId }
    })
    res.json({ success: "Producto eliminado con exito." })
})

module.exports = router;