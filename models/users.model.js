const pool = require('../config/db_pgsql');
const queries = require('../queries/users.queries');

const getUserByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getUserByEmail, [email]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllUsers);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const createUser = async (user) => {
    const { username, email, password, isadmin } = user;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createUser, [username, email, password, isadmin]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const updateUser = async (user) => {
    const { username, password, isadmin, islogged, email } = user;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.updateUserByEmail, [username, password, isadmin, islogged, email]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const toggleIsLogged = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.toggleIsLogged, [email]);
        result = data.rowCount;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
    return result;
};

const deleteUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteUserByEmail, [email]);
        result = data.rowCount;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
    return result;
};

module.exports = {
    getAllUsers,
    getUserByEmail,
    createUser,
    updateUser,
    toggleIsLogged,
    deleteUser
};

// getAllUsers().then(data => console.log(data));

// getUserByEmail('charlie.black@example.com').then(data => console.log(data));

// const newUser = {
    // username: 'Jonás',
    // email: 'jonas@email.com',
    // password: 'jonipass',
    // isadmin: true
// }

// createUser(newUser).then(data => console.log(data));

// const modifiedUser = {
//     username: 'Jonás',
//     password: 'jonipassword',
//     isadmin: true,
//     islogged: true,
//     email: 'jonas@email.com'
// }

// updateUser(modifiedUser).then(data => console.log(data));

// toggleIsLogged('jonas@email.com').then(data => console.log(data));

// deleteUser('bob.brown@example.com').then(data => console.log(data));