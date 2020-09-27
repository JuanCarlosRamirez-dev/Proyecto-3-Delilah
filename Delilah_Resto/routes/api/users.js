const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User } = require("../../config/conexion");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const jwt = require("jwt-simple");
const { req, res } = require("../../app");


router.post('/register', async (req, res) => {
  console.log(req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({ errores: errors.array() });
  }

  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const user = await User.create(req.body);
  res.json(user);


  /* 
  if (req.body._id === "") {
  let per = new Persona({
     nombres: req.body.nombres,
     apellidos: req.body.apellidos,
     edad: req.body.edad
   });
 
   per.save();
 } else {
   //console.log(req.body._id);
   Persona.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }, (err, model) => {
     if (err) throw err;
   });
 }
 res.redirect('/'); */
});

router.post("/login", async (req, res) => {

  const user = await User.findOne({ where: { email: req.body.email } })
  const same = bcrypt.compareSync(req.body.password, user.password)
  same ? (
    res.json({ success: "Ya estas dentro " }),
    createToken(user)
  ) : (
      res.json({ error: "Usuario y/o contraseña incorrectos" })
    )
})

const createToken = (user) => {
  const payload = {
    usuarioId: user.id,
    createdAt: moment().unix,
    expiredAt: moment().add(5, "hours").unix
  }
  return jwt.encode(payload, "secreto");
}


module.exports = router;
