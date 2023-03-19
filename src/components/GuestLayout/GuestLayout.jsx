import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../HomeFooter/HomeFooter';
import HeaderNav from '../Navbar/Header/HeaderNav';

const { Header, Content } = Layout;

const ClientLayout = () => {
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
