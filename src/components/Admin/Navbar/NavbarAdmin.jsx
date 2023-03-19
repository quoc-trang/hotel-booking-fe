import React from 'react';

import HeaderNavAdmin from './HeaderNavAdmin/HeaderNavAdmin';
import SiderNavAdmin from './SiderNavAdmin/SiderNavAdmin';
import './index.scss';

const NavbarAdmin = () => {
  return (
    <div className="block">
      <div className="navbar__wrapper">
        <SiderNavAdmin />
      </div>
      <HeaderNavAdmin />
    </div>
  );
};

export default NavbarAdmin;
