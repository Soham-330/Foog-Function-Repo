import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hero from './Hero';
import BookAppointment from './BookAppointment';
import Availability from './Appointment/Booking'
import UserDetailsForm from './UserDetails';
import Categories from './Categories/Categories'
import Products from './Products';

const AllRoutes = () => (
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/appointment" element={<BookAppointment />} />
        <Route path="/appointment/:id" element={<Availability />} />
        <Route path="/category/:id" element={<Products />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/userdetails" element={<UserDetailsForm />} />
      </Routes>
);

export default AllRoutes;
