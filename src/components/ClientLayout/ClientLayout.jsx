import { Layout } from 'antd';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Footer from '../HomeFooter/HomeFooter';
import HeaderNav from '../Navbar/Header/HeaderNav';
import SiderNav from '../Navbar/Sider/SiderNav';

const ClientLayout = () => {
  const role = window.localStorage.getItem('role');

  if (role !== 'ROLE_USER') {
    return <Navigate to="/" replace />;
  }

  const { Header, Content } = Layout;
  return (
    <Layout>
      <Layout>
        <Header className="bg-white border-b-2">
          <HeaderNav />
        </Header>
        <Content
          className="bg-white"
          style={{ paddingLeft: '5rem', paddingTop: '79px' }}
        >
          <Outlet />
          <Footer />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ClientLayout;
