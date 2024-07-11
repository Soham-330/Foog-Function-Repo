import Hero from './Components/Hero'
import { IonApp, setupIonicReact } from "@ionic/react"
import './Components/Hero.css'
import { Route, Routes } from 'react-router-dom';
import AdminPage from './Components/Admin/AdminPage'
import Categories from './Components/Categories/Categories'
import BookAppointment from './Components/BookAppointment'
import { Router } from 'react-router-dom'
import DieticianSlotManager from './Components/Admin/BookedSlots'
import UserDetails from './Components/UserDetails'
import AllRoutes from './Components/Routes'
import Availability from './Components/Appointment/Booking';
import Products from './Components/Products';
import ManageOrders from './Components/Admin/ManageOrders';
setupIonicReact();

function App() {

  return (
    <>
      <ManageOrders />
      
    </>
  )
}

export default App
