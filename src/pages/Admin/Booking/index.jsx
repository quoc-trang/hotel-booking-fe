import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import bookingApi from '../../../api/bookingApi';
import { TableBookings } from '../../../components';

const Booking = () => {
  const [bookings, setBookings] = useState();
  const loadingContext = useLoadingContext();
  const { id } = useParams();

  useEffect(() => {
    const getAllBookings = async () => {
      const { data } = await bookingApi.getAllBookingHotel(id);
      data && setBookings(data.data.bookings);
    };

    getAllBookings();
    loadingContext.done();
  }, []);
  return (
    <Card className="px-5">
      {bookings && <TableBookings bookings={bookings} />}
    </Card>
  );
};

export default Booking;
