
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer/Footer";
import AdminPage from "./components/Admin/Admin";
import ManageItems from "./components/Admin/ManageItems";
import ManageBookings from "./components/Admin/ManageBookings";
import FeedbackList from "./components/Admin/FeedbackList";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import BookAppointment from "./components/Booking/BookAppointment";
import Testimonials from "./components/Footer/Testimonial";
import { CartProvider } from "./components/Cart/CartProvider";
import CartTab from "./components/Cart/cartTab";
import Booking from "./components/Booking/Booking";
import Products from "./components/Products/Products";
import UserDetailsForm from "./components/Booking/UserDetails";
import Categories from "./components/Products/Categories";
import ManageAvailability from "./components/Admin/ManageAvailability";
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
