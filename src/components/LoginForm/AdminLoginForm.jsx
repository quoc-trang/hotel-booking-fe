/* eslint-disable react/prop-types */
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import './LoginForm.scss';

const AdminLoginForm = ({ onFinish, onFinishFailed, loadingButton }) => {
  const { t } = useTranslation();

  const layout = {
    labelCol: { span: { sm: 24, md: 8, lg: 6 } },
    wrapperCol: { span: { sm: 24, md: 16, lg: 12 } },
  };
  return (
    <>
      <Form
        labelCol={layout.labelCol}
        wrapperCol={layout.wrapperCol}
        className="login__form"
        name="basic"
        initialValues={{
          remember: true,
        }}
        layout="vertical"
        size="large"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={t('login.email')}
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input placeholder={t('login.email_placeholder')} />
        </Form.Item>

        <Form.Item
          label={t('login.password')}
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
          ]}
        >
          <Input.Password placeholder={t('login.password_placeholder')} />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            className="submit__button text-white"
            loading={loadingButton}
          >
            {t('login.login')}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AdminLoginForm;
