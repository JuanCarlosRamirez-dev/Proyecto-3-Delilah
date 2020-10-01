
module.exports = (sequelize, type) => {
    return sequelize.define("order", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: type.ENUM('Nuevo', 'Confirmado', 'Preparando', 'Enviado', 'Entregado', 'Cancelado'),
            defaultValue: "Nuevo"
        },
        id_user: type.INTEGER
    })
}