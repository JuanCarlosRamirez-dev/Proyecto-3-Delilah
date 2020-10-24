const sequelize = require("../api/config/conexion")
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jwt-simple");
const { validationResult } = require("express-validator");


async function userRegister(req, res) {

    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(404).json({ errores: errors.array() })

        let reqEmail = await sequelize.query(`SELECT DISTINCT email FROM customers WHERE email = "${req.body.email}"`,
            { type: sequelize.QueryTypes.SELECT });
        //console.info(reqEmail)
        if (reqEmail[0]) { res.json({ error: "El usuario ya existe" }) }
        else {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
            const createUser = await sequelize.query(`INSERT INTO customers (customer_name,customer_lastname,email,phone_number,address,city_id,password) VALUES (:customer_name,:customer_lastname,:email,:phone_number,:address,:city_id,:password)`,
                { replacements: req.body, type: sequelize.QueryTypes.SELECT })
            res.json({ success: "Usuario creado con éxito" })
        }
    }
    catch (error) { res.status(400).json("Error: " + error) }
}

async function userLogin(req, res) {

    try {

        const getUser = await sequelize.query(`SELECT DISTINCT id,admin,password FROM customers WHERE email = "${req.body.email}"`,
            { type: sequelize.QueryTypes.SELECT })

        const same = bcrypt.compareSync(req.body.password, getUser[0].password)
        if (same) {
            res.json({
                success: "Ya estas dentro ",
                token: createToken(getUser)
            })
            createToken(getUser)
        } else { res.json({ error: "Usuario y/o contraseña incorrectos" }) }
    }
    catch (error) { res.status(400).json("Error: " + error) }
}

async function userModify(req, res) {

    await User.update(req.body, {
        where: { id: req.params.userId }
    })
    res.json({ success: "Usuario actualizado." })

}

const createToken = (getUser) => {
    const payload = {
        usuarioId: getUser[0].id,
        userAdmin: getUser[0].admin,
        createdAt: moment().unix,
        expiredAt: moment().add(10, "minutes").unix
    }
    return jwt.encode(payload, "secreto")
}

module.exports = { userRegister, userLogin, userModify }