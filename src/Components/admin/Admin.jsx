import { Link } from "react-router-dom";
import "./admin.css";
function AdminPage() {
  return (
    <>
      <div className="adminPage">
        <Link className="adminBtns" to="/Admin/ManageItems">
          {" "}
          Manage Items{" "}
        </Link>
        <Link className="adminBtns" to="/Admin/ManageBookings">
          {" "}
          Manage Orders and Appointments
        </Link>
        <Link className="adminBtns" to="/Admin/ManageAvailability">
          {" "}
          Manage Availability{" "}
        </Link>
        <Link className="adminBtns" to="/Admin/Feedbacks">
          {" "}
          See Feedbacks{" "}
        </Link>
        <Link className="adminBtns" to="/Admin/ManageConsultants">
          {" "}
          ManageConsultants{" "}
        </Link>
      </div>

    </>
  );
}

export default AdminPage;
