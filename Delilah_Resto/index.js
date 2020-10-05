const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT_SERVER = 3000;
const apiRouter = require("./routes/api");

require("./config/conexion");

app.listen(PORT_SERVER, () => {
  console.info(`Servidor arrancado en el puerto ${PORT_SERVER}`);
});

app.use(function (err, req, res, next) {
  if (!err) return next();
  console.log('Error en el servidor: ', err);
  res.status(500).send('Error');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.get("/", (request, response) => {
  response.send("Hola Mundo");
});

module.exports = app;
