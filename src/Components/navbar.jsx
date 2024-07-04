import { useState } from "react";
import { Link } from "react-router-dom"


function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (

       
        <>

          

            <div className="navbar">
                <div className="logo">
                    <h2>FoogFunction</h2>
                </div>
                <div className="links">
                    <Link className="link" to="/"> Home </Link>
                    <Link className="link" to="/Admin"> Admin </Link>
                    <Link className="link" to="/Products"> Products </Link>
                    <Link className="link" to="/About"> About </Link>
                    <Link className="link" to="/Contact"> Contact </Link>
                    <Link className="link" to="/Testimonials"> Testimonials </Link>
                    <Link className="link" to="/BookAppointment"> Book-Appointment </Link>
                </div>


                <div className="mbtn" onClick={() => setMenuOpen(!menuOpen)}><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg></div>

            </div>
            <div className={menuOpen ? "sidebar open" : "sidebar closed"}>
                <Link className="link" to="/"> Home </Link>
                <Link className="link" to="/Admin"> Admin </Link>
                <Link className="link" to="/Products"> Products </Link>
                <Link className="link" to="/About"> About </Link>
                <Link className="link" to="/Contact"> Contact </Link>
                <Link className="link" to="/Testimonials"> Testimonials </Link>
                <Link className="link" to="/BookAppointment"> Book-Appointment </Link>
            </div>

        </>


    )
}

export default Navbar