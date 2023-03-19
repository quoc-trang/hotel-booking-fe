import { UserOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

import usa from '../../../assets/images/usa.svg';
import vietnamIcon from '../../../assets/images/vietnamIcon.png';
import UserControl from '../../UserControl/UserControl';
import './index.scss';

const HeaderNav = () => {
  const { t, i18n } = useTranslation();

  const userData = window.localStorage.getItem('userData')
    ? JSON.parse(window.localStorage.getItem('userData'))
    : '';

  const accessToken = userData.token;

  const languageOptions = [
    {
      key: 'en',
      value: 'en',
      label: (
        <div className="pt-2">
          <img src={usa} alt="" className="w-5" />
        </div>
      ),
    },
    {
      key: 'vi',
      value: 'vi',
      label: (
        <div className="pt-2">
          <img src={vietnamIcon} alt="" className="w-5" />
        </div>
      ),
    },
  ];

  useEffect(() => {
    i18n.changeLanguage(defaultLanguage);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  const defaultLanguage = window.localStorage.getItem('lng');

  return (
    <div className="flex h-full justify-between items-center">
      <NavLink to="/">
        <h1 className="font-bold text-xl">tranq.</h1>
      </NavLink>
      <div className="flex items-center">
        <Select
          defaultValue={
            i18n.language === 'en' ? languageOptions[0] : languageOptions[1]
          }
          options={languageOptions}
          onChange={changeLanguage}
        />
        {accessToken ? (
          <Button
            type="link"
            className="flex items-center"
            icon={<UserOutlined />}
          >
            <UserControl />
          </Button>
        ) : (
          <Link to="/login">
            <Button
              type="link"
              className="flex items-center"
              icon={<UserOutlined />}
            >
              <span className="pt-1">{t('navbar.login')}</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderNav;
