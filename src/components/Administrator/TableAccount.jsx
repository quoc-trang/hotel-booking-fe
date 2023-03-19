import { Button, Popconfirm, Table, Tag } from 'antd';
import React from 'react';

const TableAccount = ({ accounts, handleOke, setUserId, setStatus }) => {
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

export default TableAccount;
