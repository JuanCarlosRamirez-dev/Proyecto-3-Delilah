
module.exports = (sequelize, type) => {
    return sequelize.define("user", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        admin: {
            type: type.BOOLEAN,
            defaultValue: false
        },
        name: type.STRING,
        lastname: type.STRING,
        email: type.STRING,
        telephone: type.INTEGER,
        address: type.STRING,
        password: type.STRING(150),
    });
};