import { Modal } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { IoBedSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { cityApi, hotelApi } from '../../api';
import { CityIntro, HotelPopulerList, MainSection } from '../../components';
import './HomePage.scss';

const HomePage = () => {
  const role = window.sessionStorage.getItem('role');
  const hotelId = window.sessionStorage.getItem('hotelId');

  if (role === 'ROLE_HOTEL') {
    return <Navigate to={`/manageHotel/${hotelId}`} replace />;
  }

  if (role === 'ROLE_ADMIN') {
    return <Navigate to={`/admin`} replace />;
  }

  const loadingContext = useLoadingContext();
  const DATE_FORMAT = 'DD-MM-YYYY';
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const [date, setDate] = useState([moment(), moment(moment().add(3, 'day'))]);

  const [options, setOptions] = useState([]);
  const [children, setChildren] = useState(1);
  const [adults, setAdults] = useState(1);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const getPrices = async () => {
    const response = await hotelApi.getPrices();
    if (response.data.status === 'success') {
      setMinPrice(response.data.data.minPrice);
      setMaxPrice(response.data.data.maxPrice);
    }
  };

  useEffect(() => {
    getPrices();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const error = () => {
    Modal.error({
      title: 'Search your favorite city',
      content: 'Please, enter a city...',
    });
  };

  const onFinish = (value) => {
    if (cityName === '') {
      error();
    } else {
      setCityName(value.city);

      navigate({
        pathname: '/hotels',
        search: `?city=${cityName}&minPrice=${minPrice}&maxPrice=${maxPrice}&checkIn=${moment(
          date[0]
        ).format('X')}&checkOut=${moment(date[1]).format(
          'X'
        )}&adults=${adults}&children=${children}&order=desc`,
      });
    }
  };
  const search = _.debounce(async (e) => {
    setLoading(true);
    const response = await cityApi.search(e);
    if (response.data.status === 'success') {
      setOptions(
        response.data.data.map((item) => {
          return {
            value: item.city && item.city,
            label: (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {item.city && item.city}
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <IoBedSharp
                    style={{
                      marginRight: '2px',
                    }}
                  />
                  {item.count_hotel && item.count_hotel}
                </span>
              </div>
            ),
          };
        })
      );
      setLoading(false);
    }
  }, 300);

  const handleSearch = (value) => {
    if (value && value !== '') {
      search(value);
    } else if (value === '') {
      setCityName('');
      setOptions([]);
    }
  };

  const onSelect = (value) => {
    setCityName(value);
  };

  const [hotelData, setHotelData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const getCities = async () => {
    try {
      const response = await cityApi.getAll();
      if (response.data.status === 'success') {
        setCityData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHotels = async () => {
    let result = await hotelApi.getAll();
    if (result.data.status === 'success') {
      const { data } = result;
      result.data.data.hotels
        .sort((a, b) => {
          const keyA = a.rating,
            keyB = b.rating;

          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        })
        .reverse();
      setHotelData(data.data.hotels);
      data && loadingContext.done();
    }
  };

  useEffect(() => {
    getCities();
    fetchHotels();
  }, []);

  const onClickCity = (city) => {
    navigate({
      pathname: '/hotels',
      search: `?city=${city}&minPrice=${minPrice}&maxPrice=${maxPrice}&checkIn=${moment(
        date[0]
      ).format('X')}&checkOut=${moment(date[1]).format(
        'X'
      )}&adults=${adults}&children=${children}&order=desc`,
    });
  };

  return (
    <div className="homepage__container">
      <MainSection
        visible={visible}
        date={date}
        options={options}
        childrenData={children}
        adults={adults}
        cityName={cityName}
        loading={loading}
        handleVisibleChange={handleVisibleChange}
        onFinish={onFinish}
        handleSearch={handleSearch}
        onSelect={onSelect}
        setAdults={setAdults}
        setChildren={setChildren}
        setCityName={setCityName}
        DATE_FORMAT={DATE_FORMAT}
        setDate={setDate}
      />
      <HotelPopulerList hotelData={hotelData} />
      <CityIntro cityData={cityData} onClickCity={onClickCity} />
    </div>
  );
};

export default HomePage;
