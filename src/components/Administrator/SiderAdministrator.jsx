import { BarChartOutlined, BarsOutlined } from '@ant-design/icons';
import { Divider, Space } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';

const SiderAdministrator = () => {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      const navbar = document.querySelector('.navbar__logo__wrapper');
      navbar.classList.add('navbar__logo__wrapper__with_shadow');
    } else {
      const navbar = document.querySelector('.navbar__logo__wrapper');
      navbar.classList.remove('navbar__logo__wrapper__with_shadow');
    }
  });

  return (
    <>
      <div className="navbar__sider__wrapper">
        <Space className="space">
          <a className="link">
            <BarsOutlined className="icon" />
          </a>
        </Space>

        <Divider
          className="navbar__sider__divider"
          style={{ margin: '14px 0' }}
        />
        <Space className="space">
          <NavLink className="link" to="/admin">
            <BarChartOutlined className="icon" />
            <span className="text__icon">Accounts</span>
          </NavLink>
        </Space>
      </div>
    </>
  );
};

export default SiderAdministrator;
