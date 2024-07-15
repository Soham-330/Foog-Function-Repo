import AppointmentManager from "./subManagers/ManageAppointments"
import OrderManager from "./subManagers/ManageOrders"



function ManageBookings(){

    return(
    <>
    <AppointmentManager/>
    <OrderManager/>
    </>

    )
}

export default ManageBookings