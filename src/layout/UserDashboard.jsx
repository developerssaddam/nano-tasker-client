import { Outlet } from "react-router-dom";
import DsahboardNavbar from "../components/UserDashboard/DashboardNavbar/DsahboardNavbar";

const UserDashboard = () => {
  return (
    <div>
      <DsahboardNavbar />
      <Outlet />
      Footer
    </div>
  );
};

export default UserDashboard;
