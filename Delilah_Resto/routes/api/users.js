
const bcrypt = require("bcryptjs");
const { User } = require("../../config/conexion");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const jwt = require("jwt-simple");


module.exports = {

  userRegister: async (req, res) => {

    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) return res.status(404).json({ errores: errors.array() })

      const email = await User.findOne({ where: { email: req.body.email } })

      if (email) { res.json({ error: "El usuario ya existe" }) }
      else {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const user = await User.create(req.body);
        res.json(user);
      }
    }
    catch (err) { res.status(404).json({ errores: err.array() }) }
  },

  userLogin: async (req, res) => {

    const user = await User.findOne({ where: { email: req.body.email } })
    const same = bcrypt.compareSync(req.body.password, user.password)
    if (same) {
      res.json({
        success: "Ya estas dentro ",
        admin: user.admin,
        token: createToken(user)
      })
      createToken(user)
      //console.log(createToken(user))
    } else { res.json({ error: "Usuario y/o contraseña incorrectos" }) }
  },

  userModify: async (req, res) => {

    await User.update(req.body, {
      where: { id: req.params.userId }
    })
    res.json({ success: "Usuario actualizado." })
  }

}

/* Crear token para cada usuario */
const createToken = (user) => {
  const payload = {
    usuarioId: user.id,
    userAdmin: user.admin,
    createdAt: moment().unix,
    expiredAt: moment().add(10, "minutes").unix
  }
  return jwt.encode(payload, "secreto")
}

