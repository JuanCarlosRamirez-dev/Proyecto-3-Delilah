module.exports = (sequelize, type) => {
    return sequelize.define("product", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productName: type.STRING,
        description: type.STRING,
        price: type.INTEGER
    })
}