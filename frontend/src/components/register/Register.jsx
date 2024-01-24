// Register.js
import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: ''
    });
const navigate = useNavigate()
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register/', userData);
            navigate('/hello')
            console.log(response.data);
            // handle success (e.g., redirect to login page)
        } catch (error) {
            console.error(error);
            console.log("hello there")
            // handle error (e.g., show error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Username" />
            <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
