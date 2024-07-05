import Hero from './Components/Hero'
import { IonApp, setupIonicReact } from "@ionic/react"
import './Components/Hero.css'
import AdminPage from './Components/Admin/AdminPage'
import Categories from './Components/Categories/Categories'
import BookAppointment from './Components/BookAppointment'
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

      <IonApp>
      <AdminPage />
      </IonApp>
      {/* <Categories /> */}
    </>
  )
}

export default App
