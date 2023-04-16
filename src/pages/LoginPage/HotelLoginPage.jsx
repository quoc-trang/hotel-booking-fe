import { message } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { loginApi } from '../../api';
import useLocalToken from '../../api/helpers';
import { HotelLoginForm } from '../../components';
import './LoginPage.scss';

const HotelLoginPage = () => {
  const loadingContext = useLoadingContext();

  const [loadingButton, setLoadingButton] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoadingButton(true);
    try {
      const response = await loginApi.login({
        email: values.email,
        password: values.password,
      });
      const status = await response.data.status;
      const data = await response.data;
      const role = await response.data.data.role;

      if (status === 'success') {
        sessionStorage.setItem('userData', JSON.stringify(data.data));
        sessionStorage.setItem('token', data.data.token);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('hotelId', data.data.hotelId);
        setLoadingButton(false);
        useLocalToken();
        if (role === 'ROLE_HOTEL') {
          message.success('Login successfully');
          navigate(`/manageHotel/${response.data.data.hotelId}`);
        } else {
          message.error('Email or password is invalid!!!');
        }
      }
    } catch (error) {
      setLoadingButton(false);
      message.error('Email or password is invalid!!!');
    }
  };

  const onFinishFailed = () => {
    console.log('something went wrong');
  };

  loadingContext.done();

  return (
    <div className="login__container login__hotel__container">
      <div className="login__wrapper opacity-90 bg-yellow-50">
        <h2 className="login__form__title">{t('login.hotel_login')}</h2>
        <HotelLoginForm
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          loadingButton={loadingButton}
        />
      </div>
    </div>
  );
};

export default HotelLoginPage;
