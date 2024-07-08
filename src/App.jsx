import Hero from './Components/Hero'
import { IonApp, setupIonicReact } from "@ionic/react"
import './Components/Hero.css'
import AdminPage from './Components/Admin/AdminPage'
import Categories from './Components/Categories/Categories'
import BookAppointment from './Components/BookAppointment'
import { Router } from 'react-router-dom'
import DieticianSlotManager from './Components/Admin/BookedSlots'
import UserDetails from './Components/UserDetails'
setupIonicReact();

function App() {

  return (
    <>
      <DieticianSlotManager />
      <UserDetails />
    </>
  )
}

export default App
