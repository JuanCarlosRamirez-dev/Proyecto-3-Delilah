const sequelize = require("../api/config/conexion")
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jwt-simple");
const { validationResult } = require("express-validator");
const userQueries = require("../dal/repositories/user.repository")


async function userRegister(req, res) {

    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(404).json({ errores: errors.array() })

        let reqEmail = await sequelize.query(userQueries.requestEmailQuery(req.body.email),
            { type: sequelize.QueryTypes.SELECT });
        //console.info(reqEmail)
        if (reqEmail[0]) { res.json({ error: "El usuario ya existe" }) }
        else {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
            const createUser = await sequelize.query(userQueries.createUserQuery(),
                { replacements: req.body, type: sequelize.QueryTypes.SELECT })
            res.json({
                success: "Usuario creado con éxito",
                User: createUser.customer_name,
                Email: createUser.email
            })
        }
    }
    catch (error) { res.status(400).json("Error: " + error) }
}

async function userLogin(req, res) {

    try {

        const getUser = await sequelize.query(userQueries.requestLoginQuery(req.body.email),
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
    catch (error) { res.status(400).json("El nombre de usuario no existe") }
}

async function userModify(req, res) {

    const userId = req.params.userId;
    const newUserParams = {
        admin: req.body.admin,
        nombre: req.body.customer_name,
        apellido: req.body.customer_lastname,
        email: req.body.email,
        phone: req.body.phone_number,
        address: req.body.address,
        city: req.body.city_id,
        pass: req.body.password
    }

    try {
        const updateUserById = await sequelize.query(userQueries.updateUserQuery(userId, newUserParams),
            { type: sequelize.QueryTypes.UPDATE })
        res.json({
            success: "Usuario actualizado.",
            usuario: newUserParams
        })
    }
    catch (error) { res.status(400).json("Error: " + error) }

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