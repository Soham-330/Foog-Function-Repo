import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Cart/CartProvider";

function Navbar() {
  const [cartList, setcartList] = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    let total = 0;
    cartList.forEach((item) => ((total) += Number(item.quantity)));
    setTotalQuantity(total);
  }, [cartList]);

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <a href="./">  <h2>FoogFunction</h2></a>
        </div>
        <div className="links">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/BookAppointment">
            Book-Appointment
          </Link>
          <Link className="link" to="/Products">
          Products
          </Link>
          <Link className="link" to="/Contact">
            Contact
          </Link>
          <Link className="link" to="/About">
            About
          </Link>
          <Link className="link" to="/Admin">
            Admin
          </Link>
        
          {/* <Link className="link" to="/Cart">
          <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#e8eaed"><path d="M286.79-81Q257-81 236-102.21t-21-51Q215-183 236.21-204t51-21Q317-225 338-203.79t21 51Q359-123 337.79-102t-51 21Zm400 0Q657-81 636-102.21t-21-51Q615-183 636.21-204t51-21Q717-225 738-203.79t21 51Q759-123 737.79-102t-51 21ZM235-741l110 228h288l125-228H235Zm-30-60h589.07q22.97 0 34.95 21 11.98 21-.02 42L694-495q-11 19-28.56 30.5T627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Zm140 288h288-288Z"/></svg>
            <span className="quantity" >{totalQuantity}</span></Link> */}
        </div>

        <Link className="link" to="/Cart">
          <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#e8eaed"><path d="M286.79-81Q257-81 236-102.21t-21-51Q215-183 236.21-204t51-21Q317-225 338-203.79t21 51Q359-123 337.79-102t-51 21Zm400 0Q657-81 636-102.21t-21-51Q615-183 636.21-204t51-21Q717-225 738-203.79t21 51Q759-123 737.79-102t-51 21ZM235-741l110 228h288l125-228H235Zm-30-60h589.07q22.97 0 34.95 21 11.98 21-.02 42L694-495q-11 19-28.56 30.5T627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Zm140 288h288-288Z"/></svg>
            <span className="quantity" >{totalQuantity}</span></Link>
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
        {/* <Link
          onClick={() => setMenuOpen(!menuOpen)}
          className="link"
          to="/Cart"
        >
          {" "}
          Cart{" "}
        </Link> */}
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
