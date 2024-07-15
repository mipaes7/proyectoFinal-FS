const userQueries = {
    // Read All users
    getAllUsers: `
    SELECT username, email, password, isadmin, islogged
    FROM users;`,

    // Create a new user
    createUser: `
    INSERT INTO users (username, email, password, isadmin, islogged)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`,

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

    // Delete the user by email
    deleteUserByEmail: `
    DELETE FROM users
    WHERE 
        email = $1;`
};

module.exports = userQueries;
