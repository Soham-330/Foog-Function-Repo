import Hero from "./components/Hero"
import About from './components/About'
import Contact from './components/Contact'
import Testimonials from './components/Testimonial'
import Footer from './components/Footer'
import BookAppointment from './components/BookAppointment'
import { Route, Routes } from "react-router-dom"

import Categories from "./components/Categories"
import AdminPrompt from "./components/admin/FeedbackList"
import AdminAvailability from "./components/admin/a/DieticianUn (1)"

import './App.css'
import Home from "./components/Home"
import AdminPage from "./components/Admin"
import Navbar from "./components/navbar"
import Products from "./components/Product and Cart/ProductCard"
import ProductGrid from "./components/Product and Cart/ProductGrid"
import Header from "./components/Product and Cart/header"
import CartTab from "./components/Product and Cart/cartTab"





function App() {

  return (
    <>



      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductGrid />} />
        <Route path="/bookappointment" element={<BookAppointment />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartTab />} />


      </Routes>

     
    </>

  )
}

export default App
