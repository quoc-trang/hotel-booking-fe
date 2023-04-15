import { Layout } from 'antd';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import HeaderNavAdmin from '../Navbar/HeaderNavAdmin/HeaderNavAdmin';
import SiderNavAdmin from '../Navbar/SiderNavAdmin/SiderNavAdmin';

const AdminLayout = () => {
  const role = window.sessionStorage.getItem('role');

  if (role !== 'ROLE_HOTEL') {
    return <Navigate to="/login" replace />;
  }
  const loadingContext = useLoadingContext();

  loadingContext.done();

  const { Sider, Header, Content } = Layout;

  return (
    <Layout>
      <Sider>
        <SiderNavAdmin />
      </Sider>
      <Layout>
        <Header className="bg-white">
          <HeaderNavAdmin />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
