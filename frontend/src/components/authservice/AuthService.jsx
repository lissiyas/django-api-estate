// AuthService.js

import axios from "axios";
const AuthService = {
    login: async (username, password) => {
      try {
        const response = await axios.post('http://localhost:8000/api/token/', {
          username,
          password,
        });
  
        if (response.ok) {
          console.log('this is auth');
          const token = response.data.access;
          localStorage.setItem('authToken', token);
          return true;
        } else {
          console.log('this is auth failed');
          const errorData = await response.json();
          throw new Error(errorData.error);
          
        }
        
      } catch (error) {
        console.error('Login failed:', error.message);
        return false;
      }
    },
  
    logout: () => {
      localStorage.removeItem('authToken');
    },
  };
  
  export default AuthService;
  