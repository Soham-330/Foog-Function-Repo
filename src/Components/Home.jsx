import About from './About'
import BookAppointment from './BookAppointment'
import co from './co'
import Contact from './Contact'
import Footer from './Footer'
import Hero from './Hero'
import Products from './Products'
import Testimonials from './Testimonial'

function Home() {
    return(
        <>
        <Hero/>
        <About/>
        <Contact/>
        <hr/>
        <Products/>
        <hr/>
        <BookAppointment/>

        <Testimonials/>
        <Footer/>

        </>
    )
}
export default Home