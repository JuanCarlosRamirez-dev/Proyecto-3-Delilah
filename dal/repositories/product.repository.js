const { param } = require("../../api/routes/products");

const requestProductsQuery = () => {
    const query = `SELECT item_name, description, price FROM menu_item`;
    return query;
}

const requestSingleProductQuery = (params) => {
    const query = `SELECT DISTINCT item_name FROM menu_item WHERE item_name = "${params}"`;
    return query;
}

const createProductQuery = (params) => {
    const query = `INSERT INTO menu_item (item_name,description,category_id,price) VALUES ("${params.item_name}","${params.description}","${params.category_id}","${params.price}")`;
    return query;
}

const updateProductQuery = (userId, params) => {
    const query = `UPDATE menu_item SET item_name="${params.item_name}",description="${params.description}",category_id="${params.category_id}",price="${params.price}" WHERE id="${userId}"`;
    return query;
}

const deleteProductQuery = (id) => {
    const query = `DELETE from customers where id = ${id}`;
    return query;
}

module.exports = { requestProductsQuery, requestSingleProductQuery, createProductQuery, updateProductQuery, deleteProductQuery }