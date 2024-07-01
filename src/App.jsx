import Hero from "./components/Hero"
import About from './components/About'
import Contact from './components/Contact'
import Testimonials from './components/Testimonial'
import Footer from './components/Footer'
import BookAppointment from './components/BookAppointment'
import Products from './components/Products'
import { Route, Routes } from "react-router-dom"
import Categories from "./components/Categories"
import AdminAvailability from "./components/admin/DieticianUn"
import AdminPrompt from "./components/admin/AdminPrompt"



function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/bookappointment" element={<BookAppointment />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>


      <About />
      <Contact />
      <hr />
      <Products />
      <Categories />
      <hr />
      <BookAppointment />
      <Testimonials />
      <Footer />



      <AdminPrompt />
      <AdminAvailability />
    </>

  )
}

export default App
