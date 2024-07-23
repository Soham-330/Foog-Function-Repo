import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Cart/CartProvider";
import { AuthContext } from "../Admin/AuthProvider";

function Navbar() {
  const [cartList, setcartList] = useContext(CartContext);
  const [password, setPassword] = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    let total = 0;
    cartList.forEach((item) => (total += Number(item.quantity)));
    setTotalQuantity(total);
  }, [cartList]);

const onedigit = totalQuantity<10;
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
          <Link className="link" to={`/${password}`}>
            Admin
          </Link>
        
          {/* <Link className="link" to="/Cart">
          <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#e8eaed"><path d="M286.79-81Q257-81 236-102.21t-21-51Q215-183 236.21-204t51-21Q317-225 338-203.79t21 51Q359-123 337.79-102t-51 21Zm400 0Q657-81 636-102.21t-21-51Q615-183 636.21-204t51-21Q717-225 738-203.79t21 51Q759-123 737.79-102t-51 21ZM235-741l110 228h288l125-228H235Zm-30-60h589.07q22.97 0 34.95 21 11.98 21-.02 42L694-495q-11 19-28.56 30.5T627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Zm140 288h288-288Z"/></svg>
            <span className="quantity" >{totalQuantity}</span></Link> */}
        </div>

        <Link className="link" to="/Cart">
        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M220-80q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h110v-10q0-63 43.5-106.5T480-880q63 0 106.5 43.5T630-730v10h110q24 0 42 18t18 42v520q0 24-18 42t-42 18H220Zm0-60h520v-520H630v90q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-90H390v90q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-90H220v520Zm170-580h180v-10q0-38-26-64t-64-26q-38 0-64 26t-26 64v10ZM220-140v-520 520Z"/></svg>
            <span className="quantity" >{onedigit ?<b>0{totalQuantity}</b> :<b>{totalQuantity}</b>}</span></Link>
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
          to={`/${password}`}
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
