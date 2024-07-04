import About from "./About"
import BookAppointment from "./BookAppointment"
import Categories from "./Categories"
import Contact from "./Contact"
import Footer from "./Footer"
import Hero from "./Hero"
import Products from "./Products"
import Testimonials from "./Testimonial"
import AdminPrompt from "./admin/AdminPrompt"
import AdminAvailability from "./admin/a/DieticianUn (1)"


function Home() {

    return (
        <>
            <Hero/>
            <About />
            <Contact />
            <hr />
            <Products />
            <Categories />
            <hr />
            <BookAppointment />
            <Testimonials />
            <Footer />
        </>

    )
}

export default Home