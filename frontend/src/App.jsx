// App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import Register from './components/register/Register';
import Tenants from './components/tenants/Tenants';
import Properties from './components/properties/Properties';
import AddUpdateProperties from './components/properties/AddUpdateProperties';
import AddUpdateTenants from './components/tenants/AddUpdateTenants';
import LayoutRoute from './LayoutRoute';
import ProtectedRoute from './ProtectedRoute';

function App() {
  

  return (
    <div className='root'>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
         

         
          
          
          <Route element={<ProtectedRoute/>}>
                  {/* All protected routes go here */}
                  
                  <Route path="/" element={<LayoutRoute />}>
          <Route path="/logout" element={<Logout />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property-update/:id" element={<AddUpdateProperties />} />
          <Route path="/add-property" element={<AddUpdateProperties />} />
          <Route path="/tenant-update/:id" element={<AddUpdateTenants />} />
          <Route path="/add-tenant" element={<AddUpdateTenants />} />
          <Route path="/tenants" element={<Tenants />} />
        </Route>
                </Route>
             
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
