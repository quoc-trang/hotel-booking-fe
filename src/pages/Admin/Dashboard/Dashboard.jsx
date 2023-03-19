import { Card, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import hotelApi from '../../../api/hotelApi';
import { BarChart } from '../../../components';
import './Dashboard.scss';

const Dashboard = () => {
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [total, setTotal] = useState({});
  const { id } = useParams();
  const loadingContext = useLoadingContext();

  useEffect(() => {
    const getRevenueAllYear = async () => {
      const { data } = await hotelApi.revenue(id);
      setData({
        labels: data.data.map((data) => data.month),
        datasets: [
          {
            label: 'GBV (Gross Booking Value)',
            data: data.data.map((data) => data.revenue),
          },
        ],
      });
    };

    const getTotalRevenue3Months = async () => {
      const { data } = await hotelApi.getTotalRevenue(id);
      setTotal(data.data[0]);
    };

    getRevenueAllYear();
    getTotalRevenue3Months();
    data && loadingContext.done();
    loadingContext.done();
  }, []);

  return (
    <Card className="px-10">
      <div className="flex justify-around">
        <Tag className="dashboard__row__card__revenue__tag" color="cyan">
          {t('admin.totalrevenue')}
          <Tag
            className="dashboard__row__card__revenue__tag__countUp"
            color="cyan"
          >
            {<CountUp duration={1} end={total.totalRevenue} />}
          </Tag>
        </Tag>
        <Tag className="dashboard__row__card__bookings__tag" color="blue">
          {t('admin.totalbookings')}
          <Tag
            className="dashboard__row__card__bookings__tag__countUp"
            color="blue"
          >
            {<CountUp duration={1} end={total.totalBookings} />}
          </Tag>
        </Tag>
      </div>
      <Card
        className="dashboard__row__chart__space w-full"
        direction="vertical"
      >
        {data && <BarChart datasets={data} />}
      </Card>
    </Card>
  );
};

export default Dashboard;
