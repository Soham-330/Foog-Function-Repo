import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import './App.css'
import Home from './Components/Home'
import Admin from './Components/Admin'
import Hero from './Components/Hero'
import About from './Components/About'
import Contact from './Components/Contact'
import Testimonials from './Components/Testimonial'
import Footer from './Components/Footer'
import BookAppointment from './Components/BookAppointment'
import Products from './Components/Products'
import co from './Components/co'

function App() {

  return (
    <>
      <BrowserRouter>
      <nav>
        <ul>
          <li className = "navbar">
            <Link to ="/Home"> Home </Link>
          </li>
          <li className = "navbar">
            <Link to = "/Admin"> Admin </Link>
          </li>
          <li className = "navbar">
            <Link to="/Products"> Products </Link>
          </li>
          <li className = "navbar">
            <Link to = "/About"> About </Link>
          </li>
          <li className = "navbar">
            <Link to ="/Contact"> Contact </Link>
          </li>
          <li className = "navbar">
            <Link to="/Testimonials"> Testimonials </Link>
          </li>
          <li className = "navbar">
            <Link to = "/BookAppointment"> Book-Appointment </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path = "/Home" element = {<Home/>} />
        <Route path = "/Admin" element = {<Admin/>} />
        <Route path = "/About" element = {<About/>} />
        <Route path = "/Products" element = {<Products/>} />
        <Route path = "/Contact" element = {<Contact/>} />
        <Route path = "/Testimonials" element = {<Testimonials/>} />
        <Route path = "/BookAppointment" element = {<BookAppointment/>} />
      </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
