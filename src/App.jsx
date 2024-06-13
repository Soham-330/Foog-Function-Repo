import { setupIonicReact } from '@ionic/react'
import ContactUs from './Components/Contact_Us/ContactUs'
import BookAppointment from './Components/Appointment/BookAppointment'      
import AboutUs from './Components/About_Us/AboutUs'
setupIonicReact
function App(){

    return (
        <>
            <AboutUs />
            <BookAppointment price='Rs. 200' dur='1 Hour'/>
            <ContactUs />
        </>
    )
}
export default App