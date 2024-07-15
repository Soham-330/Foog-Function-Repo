import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer/Footer";
import AdminPage from "./components/Admin/Admin";
import ManageItems from "./components/Admin/ManageItems";
import Availability from "./components/Booking/Booking";
import ManageBookings from "./components/Admin/ManageBookings";
import FeedbackList from "./components/Admin/FeedbackList";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import BookAppointment from "./components/Booking/BookAppointment";
import Testimonials from "./components/Footer/Testimonial";
import Categories from "./components/Products/Categories";
import { CartProvider } from "./components/Cart/CartProvider";
import ProductGrid from "./components/Cart/ProductGrid";
import CartTab from "./components/Cart/cartTab";
function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<AdminPage />} />
          <Route path="/Admin/ManageItems" element={<ManageItems />} />
          <Route path="/Admin/ManageAvailability" element={<Availability />} />
          <Route path="/Admin/ManageBookings" element={<ManageBookings />} />
          <Route path="/Admin/Feedbacks" element={<FeedbackList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<ProductGrid />} />
          <Route path="/bookappointment" element={<BookAppointment />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<CartTab />} />
        </Routes>

        <Footer />

      </CartProvider>
    </>
  );
}

export default App;
