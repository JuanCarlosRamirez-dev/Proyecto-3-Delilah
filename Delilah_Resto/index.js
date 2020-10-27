const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT_SERVER = process.env.PORT;
const sequelize = require("./api/config/conexion")
const apiRouter = require("./api/api");

require("dotenv/config");
require("./api/config/conexion");

app.listen(PORT_SERVER, () => {
  console.info(`Servidor arrancado en el puerto ${PORT_SERVER}`);
});

sequelize.sync({ force: false }).then(() => {
  console.info("Tablas sincronizadas");
}).catch(console.error);

app.use(function (err, req, res, next) {
  if (!err) return next();
  console.log('Error en el servidor: ', err);
  res.status(500).send('Error');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

module.exports = app;