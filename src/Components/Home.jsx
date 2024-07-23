import { IonButton } from "@ionic/react"
import About from "./About/About"
import BookAppointment from "./Booking/BookAppointment"
import Contact from "./Contact/Contact"
import Testimonials from "./Footer/Testimonial"
import Hero from "./Hero/Hero"
import Categories from "./Products/Categories"


function Home() {

    return (
        <>
            <Hero />
            <About />
            <Contact/>
            <Categories/>
            <BookAppointment/>
            <Testimonials/>
            
        </>

    )
}

export default Home