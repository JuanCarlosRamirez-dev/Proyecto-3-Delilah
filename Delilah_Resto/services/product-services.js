const sequelize = require("../config/conexion")
const { validationResult } = require("express-validator");
const { Product } = require("../../config/conexion");

async function getAllProducts(req, res) {

    const product = await Product.findAll()
    res.send(product)

}

async function createProduct(req, res) {

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(404).json({ errores: errors.array() })

    const productExist = await Product.findOne({ where: { productName: req.body.productName } })

    if (productExist) {
        res.json({ error: "El producto ya existe." })
    } else {
        const product = await Product.create(req.body)
        res.json({ success: "Producto creado con éxito: ", product })
    }

}

async function updateProduct(req, res) {

    await Product.update(req.body, {
        where: { id: req.params.productId }
    })
    res.json({ success: "Producto actualizado." })

}

async function deleteProduct(req, res) {

    await Product.destroy({
        where: { id: req.params.productId }
    })
    res.json({ success: "Producto eliminado con exito." })

}


module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct }