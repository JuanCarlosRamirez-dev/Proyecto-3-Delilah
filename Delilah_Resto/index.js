const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT_SERVER = 3000;
const apiRouter = require("./routes/api");
const path = require('path');

require("./config/conexion");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.get("/", (request, response) => {
  response.send("Hola Mundo");
});

app.listen(PORT_SERVER, () => {
  console.info(`Servidor arrancado en el puerto ${PORT_SERVER}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
