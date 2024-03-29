import { Button, Col, Image, Row, Steps, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiTimeFive } from 'react-icons/bi';
import { BsFillCalendarDateFill, BsFillPeopleFill } from 'react-icons/bs';
import { GiNotebook } from 'react-icons/gi';
import { ImNotification } from 'react-icons/im';
import { IoBedSharp } from 'react-icons/io5';
import { MdSecurity } from 'react-icons/md';
import { MdOutlineChildCare } from 'react-icons/md';
import { RiShieldCheckFill } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import bookingApi from '../../api/bookingApi';
import formatCurrency from '../../utils/formatCurrency';
import handleTag from '../../utils/handleTag';
import './CheckoutConfirmationPage.scss';

const { Step } = Steps;

const CheckoutPageConfirmation = () => {
  const loadingContext = useLoadingContext();
  const [confirmationData, setConfirmationData] = useState();
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const params = useParams();
  const bookingId = params.id;

  const getBookingData = async (id) => {
    const response = await bookingApi.get(id);
    if (response.data.status === 'success') {
      setConfirmationData(response.data.data);
      loadingContext.done();
    }
  };

  useEffect(() => {
    getBookingData(bookingId);
  }, [bookingId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checkIn =
    confirmationData &&
    confirmationData &&
    moment(confirmationData.checkIn.date);

  const checkOut =
    confirmationData &&
    confirmationData &&
    moment(confirmationData.checkOut.date);

  const nights = checkOut && checkIn && checkOut.diff(checkIn, 'days');

  const subTotal =
    confirmationData &&
    confirmationData &&
    confirmationData.room.price * nights;

  const tax = subTotal * 0.1;

  const total = confirmationData && confirmationData && confirmationData.total;

  const [loading, setLoading] = useState(false);

  const handleRepay = async () => {
    setLoading(true);
    const response = await bookingApi.repay(bookingId);
    if (response.data.status === 'success') {
      location.replace(response.data.data[0]);
      setLoading(false);
    }
  };

  return (
    <div className="checkout__confirmation__container">
      <div className="checkout__confirmation__wrapper">
        <div className="checkout__confirmation__banner">
          <div className="checkout__confirmation__banner__content">
            <div className="checkout__confirmation__banner__item">
              <RiShieldCheckFill />
              <span>{t('checkout.secure_transactions')}</span>
            </div>
            <div className="checkout__confirmation__banner__item">
              <BiTimeFive />
              <span>{t('checkout.24_hours')}</span>
            </div>
            <div className="checkout__confirmation__banner__item">
              <MdSecurity />
              <span>{t('checkout.trusted_payment')}</span>
            </div>
          </div>
        </div>
        <div className="checkout__confirmation__progress">
          <Steps current={2} size="small">
            <Step title={t('checkout.choose_rom')} />
            <Step title={t('checkout.guest_payment')} />
            <Step title={t('checkout.booking_confirmation')} />
          </Steps>
        </div>

        {confirmationData && (
          <section className="checkout__confirmation__content ctn">
            <Row gutter={[16, 0]}>
              <Col xxl={16} xl={15} lg={15} md={24} sm={24} xs={24}>
                <div className="checkout__confirmation__content__heading">
                  <h1>
                    {t('checkout.your_trip_to')}{' '}
                    {confirmationData.hotel.address.city}
                  </h1>
                  <div>
                    <span className="tag__highlight">
                      {t('checkout.email_confirm')}
                      <b>{confirmationData.email}</b>
                    </span>
                    <div
                      style={{ width: '100%' }}
                      className="checkout__confirmation__small__summary"
                    >
                      <div
                        className="checkout__confirmation__content__image"
                        style={{
                          marginRight: '16px',
                          maxHeight: '150px',
                          borderRadius: '16px',
                        }}
                      >
                        <Image src={confirmationData.hotel.images[0].src} />
                      </div>
                      <div>
                        <Link to={`/hotels/${confirmationData.hotel.id}`}>
                          <h3>{confirmationData.hotel.name}</h3>
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <BsFillCalendarDateFill
                            style={{ marginRight: '5px' }}
                          />
                          <span>
                            {moment(confirmationData.checkIn.date).format(
                              'ddd, MMM Do'
                            )}{' '}
                            -{' '}
                            {moment(confirmationData.checkOut.date).format(
                              'ddd, MMM Do'
                            )}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <ImNotification style={{ marginRight: '5px' }} />
                          {t('checkout.check_in_text')}{' '}
                          {t('checkout.check_in_note')}
                        </div>
                        <div className="tag__highlight">
                          <GiNotebook />
                          {t('checkout.booking_id')}: #
                          <b>{confirmationData.id}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <div className="hr"></div>

            {confirmationData && confirmationData && (
              <Row gutter={[16, 0]}>
                <Col xxl={16} xl={15} lg={15} md={24} sm={24} xs={24}>
                  <div
                    className="checkout__confirmation__content__info"
                    id="content"
                  >
                    <div className="checkout__confirmation__content__top">
                      <div className="checkout__confirmation__content__image">
                        <Image
                          src={
                            confirmationData.room.images[0] &&
                            confirmationData.room.images[0].src &&
                            confirmationData.room.images[0].src
                          }
                        />
                      </div>
                      <div className="checkout__confirmation__content__description">
                        <h2>{confirmationData.room.type}</h2>
                        <p>
                          {confirmationData.hotel.address.address
                            ? confirmationData.hotel.address.address
                            : ''}
                          {', '}
                          {confirmationData.hotel.address.city
                            ? confirmationData.hotel.address.city
                            : ''}
                          {', '}
                          {confirmationData.hotel.address.province
                            ? confirmationData.hotel.address.province
                            : ''}
                        </p>
                      </div>
                    </div>
                    <div className="checkout__content__itinerary">
                      <Row gutter={[10, 10]} style={{ width: '100%' }}>
                        <Col xxl={16} xl={16} lg={16} md={16} sm={16} xs={24}>
                          <Row gutter={[10, 10]}>
                            <Col
                              xxl={12}
                              xl={12}
                              lg={12}
                              md={12}
                              sm={12}
                              xs={24}
                            >
                              <div className="schedule__item">
                                <div className="title">
                                  {t('checkout.check_in')}
                                </div>
                                <div className="content">
                                  {moment(confirmationData.checkIn.date).format(
                                    'ddd, MMM Do'
                                  )}
                                </div>
                              </div>
                            </Col>
                            <Col
                              xxl={12}
                              xl={12}
                              lg={12}
                              md={12}
                              sm={12}
                              xs={24}
                            >
                              <div className="schedule__item">
                                <div className="title">
                                  {t('checkout.check_out')}
                                </div>
                                <div className="content">
                                  {moment(
                                    confirmationData.checkOut.date
                                  ).format('ddd, MMM Do')}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                          <div className="schedule__item">
                            <div className="title">{t('checkout.nights')}</div>
                            <div className="content">{nights}</div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="checkout__confirmation__content__bottom">
                      <div className="room__type">{confirmationData.type}</div>
                      <div className="room__assets">
                        <ul>
                          <li className="room__assets__item">
                            <IoBedSharp />
                            <span>
                              {t('checkout.beds')}
                              {': '}
                              {confirmationData.room.beds}
                            </span>
                          </li>
                          <li className="room__assets__item">
                            <BsFillPeopleFill />
                            <span>
                              {t('checkout.adults')}
                              {': '}
                              {confirmationData.room.adults}
                            </span>
                          </li>
                          <li className="room__assets__item">
                            <MdOutlineChildCare />
                            <span>
                              {t('checkout.children')}
                              {': '}
                              {confirmationData.room.children}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xxl={8} xl={7} lg={7} md={24} sm={24} xs={24}>
                  <div className="checkout__confirmation__content__summary">
                    <div className="checkout__confirmation__content__summary__list">
                      <div className="checkout__confirmation__content__summary__item">
                        <span>{t('checkout.status')}</span>

                        <Tag
                          color={handleTag(confirmationData.status).color}
                          icon={handleTag(confirmationData.status).icon}
                          style={{ margin: 0 }}
                        >
                          {handleTag(confirmationData.status).text}
                        </Tag>
                      </div>
                      <div className="checkout__confirmation__content__summary__item">
                        <span>{t('checkout.cost_per_night')}</span>
                        <span>
                          {t('hotels.price_value', {
                            val: formatCurrency(
                              confirmationData.room.price,
                              currentLanguage
                            ),
                          })}
                        </span>
                      </div>
                      <div className="checkout__content__summary__item">
                        <span>{t('checkout.num_of_nights')}</span>
                        <span>{nights}</span>
                      </div>
                      <div className="checkout__content__summary__item">
                        <span>{t('checkout.sub_total')}</span>
                        <span>
                          {t('hotels.price_value', {
                            val: formatCurrency(subTotal, currentLanguage),
                          })}
                        </span>
                      </div>
                      <div className="checkout__confirmation__content__summary__item">
                        <span>{t('checkout.tax_and_fee')}</span>
                        <span>
                          {t('hotels.price_value', {
                            val: formatCurrency(tax, currentLanguage),
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="line"></div>
                    <div className="checkout__confirmation__content__summary__total">
                      <span>{t('checkout.total_charges')}</span>
                      <span>
                        {t('hotels.price_value', {
                          val: formatCurrency(total, currentLanguage),
                        })}
                      </span>
                    </div>
                  </div>
                  {confirmationData.status === 1 && (
                    <div className="button__purchase">
                      <p>
                        <i>*{t('checkout.noti_repay')}</i>
                      </p>
                      <Button onClick={handleRepay} loading={loading}>
                        {t('checkout.repay_now')}
                      </Button>
                    </div>
                  )}
                </Col>
              </Row>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default CheckoutPageConfirmation;
