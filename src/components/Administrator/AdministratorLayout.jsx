import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import Navbar from '../Navbar/Navbar';

const AdministratorLayout = () => {
  const role = window.localStorage.getItem('role');

  if (role !== 'ROLE_ADMIN') {
    return <Navigate to="/login" replace />;
  }
  const loadingContext = useLoadingContext();

  loadingContext.done();
  return (
    <div>
      <Navbar />
      <div style={{ paddingLeft: '5rem', paddingTop: '79px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdministratorLayout;
