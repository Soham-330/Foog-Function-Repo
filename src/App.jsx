import { setupIonicReact } from '@ionic/react'
import ContactUs from './Components/Contact_Us/ContactUs'
import BookAppointment from './Components/Appointment/BookAppointment'      
setupIonicReact
function App(){

    return (
        <>
            <ContactUs />
            <BookAppointment price='Rs. 200' dur='1 Hour'/>
        </>
    )
}
export default App