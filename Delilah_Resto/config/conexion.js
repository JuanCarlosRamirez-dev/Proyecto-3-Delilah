const Sequelize = require('sequelize');
//const MovieModel = require("./models/movie");
const UserModel = require("./../models/user");
const sequelize = new Sequelize("delilahdb", "root", "12345", {
    host: "localhost",
    dialect: "mariadb"
});

//const Movie = MovieModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
    console.info("Tablas sincronizadas");
}).catch(console.error);

module.exports = {
    User
}