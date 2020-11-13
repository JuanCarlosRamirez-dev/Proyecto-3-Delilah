const sequelize = require("../api/config/conexion")
const {
    validationResult
} = require("express-validator");
const productQueries = require("../dal/repositories/product.repository")

async function getAllProducts(req, res) {

    try {
        let reqProduct = await sequelize.query(productQueries.requestProductsQuery(), {
            type: sequelize.QueryTypes.SELECT
        });
        res.json({
            reqProduct
        })
    } catch (error) {
        res.status(400).json("Error: " + error)
    }
}

async function createProduct(req, res) {

    const newProductParams = {
        item_name: req.body.item_name,
        description: req.body.description,
        category_id: req.body.category_id,
        price: req.body.price
    }

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(404).json({
            errores: errors.array()
        })

        const productExist = await sequelize.query(productQueries.requestSingleProductQuery(newProductParams.item_name), {
            type: sequelize.QueryTypes.SELECT
        })
        if (productExist[0]) {
            res.json({
                error: "El producto ya existe."
            })
        } else {
            const newProduct = await sequelize.query(productQueries.createProductQuery(newProductParams), {
                type: sequelize.QueryTypes.SELECT
            })
            res.json({
                success: "Producto creado con éxito: ",
                data: newProduct
            })
        }
    } catch (error) {
        res.status(400).json("Error: " + error)
    }

}

async function updateProduct(req, res) {

    const productId = req.params.productId
    const newProductParams = {
        item_name: req.body.item_name,
        description: req.body.description,
        category_id: req.body.category_id,
        price: req.body.price
    }

    try {
        const updateProductById = await sequelize.query(productQueries.updateProductQuery(productId, newProductParams), {
            type: sequelize.QueryTypes.UPDATE
        })

        res.json({
            success: "Producto actualizado.",
            product: newProductParams
        })
    } catch (error) {
        res.status(400).json("Error: " + error)
    }
}

async function deleteProduct(req, res) {

    const productId = req.params.productId;

    try {
        const deleteProductById = await sequelize.query(productQueries.deleteProductQuery(productId), {
            type: sequelize.QueryTypes.DELETE
        })
        res.json({
            success: "Producto eliminado con exito."
        })
    } catch (error) {
        res.status(400).json("Error: " + error)
    }

}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}