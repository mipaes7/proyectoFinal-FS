import React from 'react';
import Nav from './Nav';
import Cookies from 'js-cookie';
import axios from 'axios';

const Header = ({ user, setUser }) => {
  const handleLogout = async () => {
    try {
      console.log(Cookies.get('token'));
      await axios.post('http://localhost:3000/api/users/logout', {}, { withCredentials: true });
      // Cookies.remove('token');
      // Cookies.remove('email');
      setUser(null);
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <header>
      <h1>Manga Library</h1>
      <Nav user={user} handleLogout={handleLogout} />
    </header>
  );
};

export default Header;

