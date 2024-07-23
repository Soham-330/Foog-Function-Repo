
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
import { AuthContext } from "./components/Admin/AuthProvider";
import { useContext } from "react";
import PaymentPage from "./components/Cart/PaymentPage";
import ManageConsultants from "./components/Admin/ManageConsultants";
function App() {

  const [password, setPassword] = useContext(AuthContext);

  return (
    <>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/${password}`} element={<AdminPage />} />
          <Route path={`/${password}/ManageItems`} element={<ManageItems />} />
          <Route path={`/${password}/ManageAvailability`} element={<ManageAvailability />} />
          <Route path={`/${password}/ManageBookings`} element={<ManageBookings />} />
          <Route path={`/${password}/Feedbacks`} element={<FeedbackList />} />
          <Route path={`/${password}/ManageConsultants`} element={<ManageConsultants />} />
          <Route path="/Appointment" element={<BookAppointment />} />
          <Route path="/Appointment/:id" element={<Booking />} />
          <Route path="/Products" element={<Categories />} />
          <Route path="/Products/:id" element={<Products />} />
          <Route path="/UserDetails" element={<UserDetailsForm />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Bookappointment" element={<BookAppointment />} />
          <Route path="/Testimonials" element={<Testimonials />} />
          <Route path="/Cart" element={<CartTab />} />
          <Route path="/Payment" element={<PaymentPage/>} />
        </Routes>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
