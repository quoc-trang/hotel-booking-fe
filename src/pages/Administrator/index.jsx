import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Space, Tabs } from 'antd';
import { Typography } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';

import accountApi from '../../api/accountApi';
import TableAccount from '../../components/Administrator/TableAccount';

const { Title } = Typography;

const Administrator = () => {
  const [accounts, setAccounts] = useState([]);
  const [status, setStatus] = useState(false);
  const [userId, setUserId] = useState();
  const [userAccounts, setUserAccounts] = useState([]);
  const [hotelOwnerAccounts, setHotelOwnerAccounts] = useState([]);

  useEffect(() => {
    const getAllAccountApi = async () => {
      const { data } = await accountApi.getAll();
      let formatData = data.data.filter((item) => item.role !== 'ROLE_ADMIN');
      formatData = formatData.map((item, index) => ({ ...item, key: index }));
      data && setAccounts(formatData);
    };
    getAllAccountApi();
  }, []);

  const handleOke = async () => {
    if (status) {
      await accountApi.enableAccount(userId);
      const getAllAccountApi = async () => {
        const { data } = await accountApi.getAll();
        let formatData = data.data.filter((item) => item.role !== 'ROLE_ADMIN');
        formatData = formatData.map((item, index) => ({ ...item, key: index }));
        data && setAccounts(formatData);
      };
      getAllAccountApi();
    } else {
      await accountApi.disableAccount(userId);
      const getAllAccountApi = async () => {
        const { data } = await accountApi.getAll();
        let formatData = data.data.filter((item) => item.role !== 'ROLE_ADMIN');
        formatData = formatData.map((item, index) => ({ ...item, key: index }));
        data && setAccounts(formatData);
      };
      getAllAccountApi();
    }
  };

  useEffect(() => {
    setUserAccounts(accounts.filter((acc) => acc.role === 'ROLE_USER'));
    setHotelOwnerAccounts(accounts.filter((acc) => acc.role === 'ROLE_HOTEL'));
  }, [accounts]);

  return (
    <Space direction="vertical" style={{ padding: '2rem', width: '100%' }}>
      <Title>Account Management</Title>
      <Tabs
        items={[
          {
            label: (
              <span>
                <AndroidOutlined />
                Hotel Owner
              </span>
            ),
            key: 'hotel_owner',
            children: (
              <TableAccount
                accounts={hotelOwnerAccounts}
                handleOke={handleOke}
                setStatus={setStatus}
                setUserId={setUserId}
              />
            ),
          },
          {
            label: (
              <span>
                <AppleOutlined />
                User
              </span>
            ),
            key: 'user',
            children: (
              <TableAccount
                accounts={userAccounts}
                handleOke={handleOke}
                setStatus={setStatus}
                setUserId={setUserId}
              />
            ),
          },
        ]}
      />
    </Space>
  );
};

export default Administrator;
