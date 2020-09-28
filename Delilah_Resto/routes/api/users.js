const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User } = require("../../config/conexion");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const jwt = require("jwt-simple");


/*Endpoint registrar usuario*/
router.post('/register', [
  check("name", "El usuario es obligatorio").not().isEmpty(),
  check("password", "La contraseña es obligatoria").not().isEmpty(),
  check("email", "El email es obligatorio").not().isEmpty(),
  check("telephone", "El telefono es obligatorio").not().isEmpty(),
  check("address", "La dirección es obligatoria").not().isEmpty(),
], async (req, res) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) return res.status(404).json({ errores: errors.array() });

  const email = await User.findOne({ where: { email: req.body.email } })

  if (email) { res.json({ error: "El usuario ya existe" }) }
  else {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.json(user);
  }

});

/* Enpoint login de usuario */
router.post("/login", async (req, res) => {

  const user = await User.findOne({ where: { email: req.body.email } })
  const same = bcrypt.compareSync(req.body.password, user.password)
  if (same) {
    res.json({ success: "Ya estas dentro " })
    createToken(user)
  } else { res.json({ error: "Usuario y/o contraseña incorrectos" }) }
})

/* Crear token para cada usuario */
const createToken = (user) => {
  const payload = {
    usuarioId: user.id,
    createdAt: moment().unix,
    expiredAt: moment().add(5, "hours").unix
  }
  return jwt.encode(payload, "secreto");
}

module.exports = router;