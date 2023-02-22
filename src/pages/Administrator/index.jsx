import { Button, Popconfirm, Table, Tag } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';

import accountApi from '../../api/accountApi';

const Administrator = () => {
  const [accounts, setAccounts] = useState([]);
  const [status, setStatus] = useState(false);
  const [userId, setUserId] = useState();

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

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '10%',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Disabled',
      dataIndex: 'disabled',
      key: 'disabled',
      render: (disabled) => {
        return disabled ? (
          <Tag color="green">True</Tag>
        ) : (
          <Tag color="red">False</Tag>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      // eslint-disable-next-line no-unused-vars
      render: (_, { record }) => (
        <>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleOke()}
            okText="Yes"
            cancelText="No"
          >
            <Button
              onClick={() => {
                setUserId(_.id);
                setStatus(_.disabled);
              }}
              type="primary"
            >
              change status
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Table
      loading={accounts.length < 0}
      dataSource={accounts}
      columns={columns}
    />
  );
};

export default Administrator;
