import { Switch, Table, Tag, notification } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';

import accountApi from '../../api/accountApi';

const Administrator = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const getAllAccountApi = async () => {
      const { data } = await accountApi.getAll();
      let formatData = data.data.filter((item) => item.role !== 'ROLE_ADMIN');
      formatData = formatData.map((item, index) => ({ ...item, key: index }));
      data && setAccounts(formatData);
    };
    getAllAccountApi();
  }, []);
  const handleDisableAccount = (id, e) => {
    notification.open({
      message: 'Change Status account successfully',
      duration: 1,
    });
    // e ? accountApi.enableAccount(id) : accountApi.disableAccount(id);
  };

  useEffect(() => {
    accountApi.disableAccount(2);
  }, []);
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
      render: (disabled) =>
        disabled ? <Tag color="green">True</Tag> : <Tag color="red">False</Tag>,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      // eslint-disable-next-line no-unused-vars
      render: (_, { record }) => (
        <>
          <Switch
            defaultChecked={!_.disabled}
            onChange={(e) => handleDisableAccount(_.id, e)}
          />
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
