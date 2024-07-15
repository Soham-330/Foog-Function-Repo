import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Cart/CartProvider";

function Navbar() {
  const [cartList, setcartList] = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    let total = 0;
    cartList.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [cartList]);

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <h2>FoogFunction</h2>
        </div>
        <div className="links">
          <Link className="link" to="/">
            {" "}
            Home{" "}
          </Link>
          <Link className="link" to="/Admin">
            {" "}
            Admin{" "}
          </Link>
          <Link className="link" to="/Products">
            {" "}
            Products{" "}
          </Link>
          <Link className="link" to="/About">
            {" "}
            About{" "}
          </Link>
          <Link className="link" to="/Contact">
            {" "}
            Contact{" "}
          </Link>
          <Link className="link" to="/Testimonials">
            {" "}
            Testimonials{" "}
          </Link>
          <Link className="link" to="/BookAppointment">
            {" "}
            Book-Appointment{" "}
          </Link>
          <Link className="link" to="/Cart">Cart  <span className="quantity" >{totalQuantity}</span></Link>
        </div>

        <div className="mbtn" onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26px"
            viewBox="0 -960 960 960"
            width="26px"
            fill="#e8eaed"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </div>
      </div>
      <div className={menuOpen ? "sidebar open" : "sidebar closed"}>
        <Link onClick={() => setMenuOpen(!menuOpen)} className="link" to="/">
          {" "}
          Home{" "}
        </Link>
        <Link
          onClick={() => setMenuOpen(!menuOpen)}
          className="link"
          to="/Admin"
        >
          {" "}
          Admin{" "}
        </Link>
        <Link
          onClick={() => setMenuOpen(!menuOpen)}
          className="link"
          to="/Products"
        >
          {" "}
          Products{" "}
        </Link>
        <Link
          onClick={() => setMenuOpen(!menuOpen)}
          className="link"
          to="/About"
        >
          {" "}
          About{" "}
        </Link>
        <Link
          onClick={() => setMenuOpen(!menuOpen)}
          className="link"
          to="/Contact"
        >
          {" "}
          Contact{" "}
        </Link>
        <Link
          onClick={() => setMenuOpen(!menuOpen)}
          className="link"
          to="/Testimonials"
        >
          {" "}
          Testimonials{" "}
        </Link>
        <Link
          onClick={() => setMenuOpen(!menuOpen)}
          className="link"
          to="/BookAppointment"
        >
          {" "}
          Book-Appointment{" "}
        </Link>
      </div>
    </>
  );
}

export default Navbar;
