import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hero from './Hero';
import BookAppointment from './BookAppointment';
import Availability from './Appointment/Booking'
import UserDetailsForm from './UserDetails';

const AllRoutes = () => (
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dieticians" element={<BookAppointment />} />
        <Route path="/dieticians/:id" element={<Availability />} />
        <Route path="/userdetails" element={<UserDetailsForm />} />
      </Routes>
);

export default AllRoutes;
