// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import AuthService from '../authservice/AuthService';

import { useNavigate } from 'react-router-dom';

import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8000/api/token/', {
          username,
          password,
        });
        const token = response.data.access;
        localStorage.setItem('accessToken', token);
        console.log('hello there successfully logged in')
        //console.log(localStorage)
        //console.log('token',token)
        
        

  
        // Assuming a successful login should redirect to /index
        navigate("/properties");
      } catch (error) {
        console.error('Login error:', error);
        // Handle login errors appropriately (e.g., display error messages)
      }
    };

    const handleLogin = async () => {
      const success = await AuthService.login(username, password);
  
      if (success) {
        // Redirect or perform any action upon successful login
        console.log('Login successful');
      } else {
        // Handle login failure
        console.log('Login failed hello');
      }
    };

    return (
      <div className='container container-login justify-content-center align-content-center'>
  <div className="circle-left-top"></div>
      <div className="card-login mx-auto position-relative">
        
       
    
        <div>
          <p> Welcome to the Estate Management Admin</p>
        </div>
        <div>
          <p> LOGIN</p>
        </div>
    
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button className='btn btn-success' type="submit">Sign In</button>
        </form>
      </div>
      <div className="circle-right-bottom"></div>
    </div>
    
    );
};

export default Login;
