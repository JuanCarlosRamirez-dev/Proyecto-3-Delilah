
const requestEmailQuery = (email) => {
    const query = `SELECT DISTINCT email FROM customers WHERE email = "${email}"`;
    return query;
}

const createUserQuery = () => {
    const query = `INSERT INTO customers (customer_name,customer_lastname,email,phone_number,address,city_id,password) VALUES (:customer_name,:customer_lastname,:email,:phone_number,:address,:city_id,:password)`;
    return query;
}

const requestLoginQuery = (email) => {
    const query = `SELECT DISTINCT id,admin,password FROM customers WHERE email = "${email}"`;
    return query;
}

const updateUserQuery = (userId, params) => {
    const query = `UPDATE customers SET admin="${params.admin}",customer_name="${params.nombre}",customer_lastname="${params.apellido}",email="${params.email}",phone_number="${params.phone}",address="${params.address}",city_id="${params.city}",password="${params.pass}" where id=${userId}`;
    return query;
}

module.exports = { requestEmailQuery, createUserQuery, requestLoginQuery, updateUserQuery }