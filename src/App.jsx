import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer/Footer";
import AdminPage from './Components/admin/Admin'
import ManageItems from "./Components/admin/ManageItems";
import ManageBookings from "./Components/admin/ManageBookings";
import FeedbackList from "./Components/admin/FeedbackList";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import BookAppointment from "./Components/Booking/BookAppointment";
import Testimonials from "./Components/Footer/Testimonial";
import { CartProvider } from "./Components/Cart/CartProvider";
import CartTab from "./Components/Cart/cartTab";
import Booking from "./Components/Booking/Booking";
import Products from "./Components/Products/Products";
import UserDetailsForm from "./Components/Booking/UserDetails";
import Categories from "./Components/Products/Categories";
import ManageAvailability from "./Components/admin/ManageAvailability";
function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<AdminPage />} />
          <Route path="/Admin/ManageItems" element={<ManageItems />} />
          <Route path="/Admin/ManageAvailability" element={<ManageAvailability />} />
          <Route path="/Admin/ManageBookings" element={<ManageBookings />} />
          <Route path="/Admin/Feedbacks" element={<FeedbackList />} />
          <Route path="/Appointment" element={<BookAppointment />} />
          <Route path="/Appointment/:id" element={<Booking />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Categories/:id" element={<Products />} />
          <Route path="/UserDetails" element={<UserDetailsForm />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Bookappointment" element={<BookAppointment />} />
          <Route path="/Testimonials" element={<Testimonials />} />
          <Route path="/cart" element={<CartTab />} />
        </Routes>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
