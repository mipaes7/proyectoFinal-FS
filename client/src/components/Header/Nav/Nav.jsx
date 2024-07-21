import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ user, handleLogout }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/library">Library</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
