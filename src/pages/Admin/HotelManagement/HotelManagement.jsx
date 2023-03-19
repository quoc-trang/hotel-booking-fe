import { Card } from 'antd';
import React from 'react';

import { HotelAdmin } from '../../../components';
import './HotelManagement.scss';

const HotelManagement = () => {
  return (
    <Card
      title="Rooms Management"
      style={{
        padding: '16px',
        minHeight: '100vh',
      }}
    >
      <HotelAdmin />
    </Card>
  );
};

export default HotelManagement;
