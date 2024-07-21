import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

const Nav = ({ user, handleLogout }) => {
  return (
    <Menu>
      <Link to="/" className="menu-item">Home</Link>
      {user ? (
        <>
          <div className='authContainer'>
            <Link to="/library" className="menu-item">My Library</Link>
            <button className="logoutBtn" onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <>
          <div className='authContainer'>
            <Link to="/login" className="menu-item">Login</Link>
            <Link to="/register" className="menu-item">Register</Link>
          </div>
        </>
      )}
    </Menu>
  );
};

export default Nav;
