const userQueries = {
    // Read All users
    getAllUsers: `
    SELECT username, email, password, isadmin, islogged
    FROM users;`,

    //Read user by email
    getUserByEmail: `
    SELECT username, email, password, isadmin, islogged
    FROM users
    WHERE email = $1`,

    // Create a new user
    createUser: `
    INSERT INTO users (username, email, password, isadmin)
    VALUES ($1, $2, $3, $4) RETURNING *;`,

    // Update user by email
    updateUserByEmail: `
    UPDATE users
    SET 
        username = $1,
        password = $2, 
        isadmin = $3,           
        islogged = $4           
    WHERE 
        email = $5;`,

    // Toggle islogged field
    toggleIsLogged: `
    UPDATE users
    SET islogged = NOT islogged
    WHERE email = $1
    RETURNING *;`,

    // Delete the user by email
    deleteUserByEmail: `
    DELETE FROM users
    WHERE 
        email = $1;`
};

module.exports = userQueries;
