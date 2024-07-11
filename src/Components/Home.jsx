import About from "./About"
import BookAppointment from "./BookAppointment"
import Categories from "./Categories"
import Contact from "./Contact"
import Footer from "./Footer"
import Hero from "./Hero"
import Testimonials from "./Testimonial"


function Home() {

    return (
        <>
            <Hero/>
            <About />
            <Contact />
            <hr />
            <Categories />
            <hr />
            <BookAppointment />
            <Testimonials />
            <Footer />
        </>

    )
}

export default Home