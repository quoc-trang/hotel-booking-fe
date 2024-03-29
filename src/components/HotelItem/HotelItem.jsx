/* eslint-disable react/prop-types */
import { Button, Col, Image, Rate, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillPhone } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { RiHotelFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import formatCurrency from '../../utils/formatCurrency';
import './HotelItem.scss';

const HotelItem = ({
  hotelData,
  cityDefault,
  adultsDefault,
  childrenDefault,
  checkInDefault,
  checkOutDefault,
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    hotelData && (
      <div
        className="hotel__item__container"
        onClick={() =>
          navigate(
            `/hotels/${hotelData.id}?city=${cityDefault}&checkIn=${checkInDefault}&checkOut=${checkOutDefault}&adults=${adultsDefault}&children=${childrenDefault}`
          )
        }
      >
        <div className="hotel__item__top">
          <Row gutter={10}>
            <Col xxl={16} xl={16} lg={16} md={16} sm={12} xs={24}>
              <div className="hotel__info">
                <h3>{hotelData.name}</h3>
                <div className="hotel__location">
                  <MdLocationOn className="icon" />
                  <span>
                    {hotelData.address.address}, {hotelData.address.city},{' '}
                    {hotelData.address.province}
                  </span>
                </div>
              </div>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
              <div className="hotel__rating">
                <Rate
                  value={hotelData.rating}
                  className="rating"
                  disabled={true}
                  allowHalf
                />
                <span>
                  {hotelData.ratingCount ? hotelData.ratingCount : 0}{' '}
                  {t('hotels.reviews')}
                </span>
              </div>
            </Col>
          </Row>
        </div>
        <div className="hotel__item__line"></div>
        <div className="hotel__item__bottom">
          <Row gutter={20}>
            <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
              <div className="photo__container">
                {hotelData.images[0] !== undefined && (
                  <Image
                    src={hotelData.images[0].src}
                    className="photo"
                    preview={false}
                  />
                )}
              </div>
            </Col>
            <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
              <Row>
                <div className="content__wrapper">
                  <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                    <div className="description__wrapper">
                      <div className="description__hotel">
                        <div style={{ marginTop: '4px' }}>
                          <RiHotelFill />
                        </div>
                        <p>{hotelData.description}</p>
                      </div>
                      <div>
                        <div style={{ marginTop: '2px' }}>
                          <AiFillPhone />
                        </div>
                        <p style={{ marginLeft: '10px' }}>{hotelData.phone}</p>
                      </div>
                    </div>
                  </Col>
                  <Col xxl={8} xl={8} lg={8} md={24} xs={24}>
                    <div className="price__wrapper">
                      <span className="price">
                        <span style={{ color: 'var(--secondary-color)' }}>
                          {t('details__hotel.from')}
                        </span>{' '}
                        <b>
                          {t('hotels.price_value', {
                            val: formatCurrency(
                              hotelData.price,
                              currentLanguage
                            ),
                          })}
                        </b>
                      </span>
                      <span className="per__night">
                        {t('hotels.per_night')}
                      </span>
                      <Button className="!text-orange-500">
                        {t('hotels.view')}
                      </Button>
                    </div>
                  </Col>
                </div>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    )
  );
};

export default HotelItem;
