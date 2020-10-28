const jwt = require("jwt-simple");
const moment = require("moment");

function checkToken(req, res, next) {
    if (!req.headers["user-token"]) {
        return res.json({ error: "Falta token" });
    }

    const userToken = req.headers["user-token"];
    let payload = {};

    try {
        payload = jwt.decode(userToken, "secreto");
    } catch (error) {
        return res.json({ error: "Token incorrecto" });
    }

    if (payload.expiredAt < moment().unix) {
        return res.json({ error: "El token ha expirado" });
    }

    req.usuarioId = payload.usuarioId;
    next();
}

module.exports = { checkToken }