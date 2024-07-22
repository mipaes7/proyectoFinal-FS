// src/components/Auth/Register.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isadmin: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users', formData);
      console.log(response.data);
      // Handle successful registration, possibly set user state
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      console.error(error);
      // Handle error during registration
    }
  };

  return (
    <div className='registerContainer'>
      <form onSubmit={handleSubmit} className='registerForm'>
      <h2 className='registerTitle'>Register</h2>
          <input className='registerInput' placeholder='Username' type="text" name="username" value={formData.username} onChange={handleChange} required />
          <input className='registerInput' placeholder='Email' type="email" name="email" value={formData.email} onChange={handleChange} required />
          <input className='registerInput' placeholder='Password' type="password" name="password" value={formData.password} onChange={handleChange} required />
          {/* <input type="checkbox" name="isadmin" checked={formData.isadmin} onChange={handleChange} /> */}
        <button className='registerSubmitBtn' type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
