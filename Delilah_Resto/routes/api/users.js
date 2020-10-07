const Sequelize = require('sequelize');
const sequelize = new Sequelize("delilahdb", "root", "12345", {
  host: "localhost",
  dialect: "mariadb"
});
const bcrypt = require("bcryptjs");
const { User } = require("../../config/conexion");
const moment = require("moment");
const jwt = require("jwt-simple");
const { check, validationResult } = require("express-validator");


module.exports = {

  userRegister: async (req, res) => {

    try {

      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(404).json({ errores: errors.array() })

      //insert query that replaces findOne method
      const email = await User.findOne({ where: { email: req.body.email } })

      if (email) { res.json({ error: "El usuario ya existe" }) }
      else {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const createUser = await sequelize.query(`INSERT INTO users (name,lastname,email,telephone,address,password) VALUES (:name,:lastname,:email,:telephone,:address,:password)`,
          { replacements: req.body, type: sequelize.QueryTypes.SELECT })
        res.json({
          success: "Usuario creado con éxito"
        })
      }
    }
    catch (error) { res.send("Error: " + error) }
  },

  userLogin: async (req, res) => {

    const user = await User.findOne({ where: { email: req.body.email } })
    const same = bcrypt.compareSync(req.body.password, user.password)
    if (same) {
      res.json({
        success: "Ya estas dentro ",
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

