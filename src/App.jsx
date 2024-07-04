import Hero from "./components/Hero"
import About from './components/About'
import Contact from './components/Contact'
import Testimonials from './components/Testimonial'
import Footer from './components/Footer'
import BookAppointment from './components/BookAppointment'
import Products from './components/Products'
import { Route, Routes } from "react-router-dom"

import Categories from "./components/Categories"
import AdminPrompt from "./components/admin/AdminPrompt"
import AdminAvailability from "./components/admin/a/DieticianUn (1)"

import './App.css'
import Home from "./components/Home"
import AdminPage from "./components/Admin"
import Navbar from "./components/navbar"



function App() {

  return (
    <>

      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/bookappointment" element={<BookAppointment />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>


     
    </>

  )
}

export default App
