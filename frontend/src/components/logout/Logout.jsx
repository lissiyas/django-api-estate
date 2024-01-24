import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

   const logout =() => {
        localStorage.removeItem('accessToken');
        navigate('/login');
      }

    

    return (
        <div>
            <h2>Logout</h2>
      <p>Are you sure you want to logout?</p>
      <button type="button" onClick={logout}>
        Logout
      </button>
    
        </div>
    ); // This component doesn't render anything
}

export default Logout;
