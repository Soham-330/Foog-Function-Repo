import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Hero from './Hero';
import BookAppointment from './BookAppointment';
import Availability from './Appointment/Booking'


const Routes = () => (
  <BrowserRouter >
      <Switch>
        <Route path="/" exact component={BookAppointment} />
        <Route path="/page/:id" component={Availability} />
      </Switch>
    </BrowserRouter >
);

export default Routes;
