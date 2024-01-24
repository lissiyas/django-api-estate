// Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Index
 from './components/index/Index';
const LayoutRoute = () => {
  return (
    <div>
      <Index />
      <Outlet />
    </div>
  );
};

export default LayoutRoute;
