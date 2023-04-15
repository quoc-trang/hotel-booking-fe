import { Layout } from 'antd';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import HeaderAdministrator from './HeaderAdministrator';
import SiderAdministrator from './SiderAdministrator';

const AdministratorLayout = () => {
  const role = window.sessionStorage.getItem('role');

  if (role !== 'ROLE_ADMIN') {
    return <Navigate to="/login" replace />;
  } else {
    <Navigate to="/admin" replace />;
  }
  const loadingContext = useLoadingContext();

  const { Header, Sider, Content } = Layout;
  loadingContext.done();
  return (
    <Layout>
      <Sider className="min-h-screen">
        <SiderAdministrator />
      </Sider>
      <Layout>
        <Header>
          <HeaderAdministrator />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdministratorLayout;
