import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Routes } from 'react-router-loading';

import { AdminLayout, ClientLayout, GuestLayout } from '../components';
import AdministratorLayout from '../components/Administrator/AdministratorLayout';
import {
  AdminLoginPage,
  CheckoutConfirmationPage,
  CheckoutPage,
  CheckoutVerifyPage,
  Dashboard,
  DetailsBookingPage,
  DetailsHotelPage,
  HomePage,
  HotelInCityPage,
  HotelInfo,
  HotelLoginPage,
  HotelManagement,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  RoomDetail,
  UserProfilePage,
} from '../pages';
import Booking from '../pages/Admin/Booking';
import Administrator from '../pages/Administrator';

const hist = createBrowserHistory();

const Router = () => {
  return (
    <>
      <Routes history={hist}>
        <Route element={<GuestLayout />} loading>
          <Route path="/" element={<HomePage />} loading />
          <Route path="/hotels" element={<HotelInCityPage />} loading />
          <Route path="/hotels/:id" element={<DetailsHotelPage />} loading />
        </Route>

        <Route element={<ClientLayout />} loading>
          <Route path="/userProfile" element={<UserProfilePage />} loading />
          <Route path="/checkout" element={<CheckoutPage />} loading />
          <Route
            path="/detailsBooking/:id"
            element={<DetailsBookingPage />}
            loading
          />
          <Route
            path="/checkoutConfirmation/:id"
            element={<CheckoutConfirmationPage />}
            loading
          />
        </Route>

        <Route path="/manageHotel/:id" element={<AdminLayout />} loading>
          <Route index element={<Dashboard />} loading />
          <Route path="dashboard" element={<Dashboard />} loading />
          <Route path="rooms" element={<HotelManagement />} loading />
          <Route path="rooms/:roomId" element={<RoomDetail />} loading />
          <Route path="profile" element={<HotelInfo />} loading />
          <Route path="booking" element={<Booking />} loading />
        </Route>

        <Route path="/admin" element={<AdministratorLayout />} loading>
          <Route index element={<Administrator />} loading />
        </Route>

        <Route path="/login" element={<LoginPage />} loading />
        <Route path="/hotel/login" element={<HotelLoginPage />} loading />
        <Route path="/admin/login" element={<AdminLoginPage />} loading />
        <Route path="/register" element={<RegisterPage />} loading />
        <Route
          path="/checkoutVerify"
          element={<CheckoutVerifyPage />}
          loading
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
export default Router;
