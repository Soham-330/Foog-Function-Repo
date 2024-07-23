import "./Admin.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

function AdminPage() {

  const [password, setPassword] = useContext(AuthContext)

  return (
    <>
      <div className="adminPage">
        <Link className="adminBtns" to={`/${password}/ManageItems`}>
          {" "}
          Manage Items{" "}
        </Link>
        <Link className="adminBtns" to={`/${password}/ManageBookings`}>
          {" "}
          Manage Orders and Appointments
        </Link>
        <Link className="adminBtns" to={`/${password}/ManageAvailability`}>
          {" "}
          Manage Availability{" "}
        </Link>
        <Link className="adminBtns" to={`/${password}/Feedbacks`}>
          {" "}
          See Feedbacks{" "}
        </Link>
        <Link className="adminBtns" to={`/${password}/ManageConsultants`}>
          {" "}
          Manage Consultants{" "}
        </Link>
      </div>

    </>
  );
}

export default AdminPage;
