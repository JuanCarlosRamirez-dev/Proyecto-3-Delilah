const createOrderQuery = (paymentId, userId) => {
    const query = `INSERT INTO placed_order (customer_id, payment_id) VALUES ("${userId}","${paymentId}")`;
    return query
}

module.exports = {
    createOrderQuery
}