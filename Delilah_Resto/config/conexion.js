const Sequelize = require('sequelize');
const sequelize = new Sequelize("delilah_resto", "root", "12345", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.sync({ force: false }).then(() => {
    console.info("Tablas sincronizadas");
}).catch(console.error);

