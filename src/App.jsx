// import Hero from "./components/Hero"
// import About from './components/About'
// import Contact from './components/Contact'
// import Footer from './components/Footer'
// import BookAppointment from './components/BookAppointment'
// import Products from './components/Products'
import { IonApp, setupIonicReact } from "@ionic/react"
import Availability from "./Components/Appointment/Booking"
import AdminAvailability from "./Components/Admin/DieticianUn"
import './Components/Hero.css'
import BookAppointment from "./Components/BookAppointment"
import Categories from './Components/Categories/Categories'
import AdminPrompt from "./Components/Admin/AdminPrompt"
setupIonicReact();

function App() {

  return (
    <>
      {/* <Hero />
      <About />
      <Contact />
      <hr />
      <Products />
      <hr />
      <BookAppointment />

      <Testimonials />
      <Footer /> */}
      <AdminAvailability />
      <AdminPrompt />
    </>

  )
}

export default App
