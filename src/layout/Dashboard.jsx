import { Outlet } from "react-router-dom";
import DsahboardNavbar from "../components/UserDashboard/DashboardNavbar/DsahboardNavbar";
import DashboardMenu from "../components/UserDashboard/DsahboardMenu/DashboardMenu";
import Footer from "../components/Footer/Footer";

const Dashboard = () => {
  return (
    <div>
       <DsahboardNavbar /> 
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/6 lg:w-1/5 bg-[#EEF1F4] md:min-h-screen p-2 lg:p-5">
          <DashboardMenu />
        </div>

        <div className="w-full md:w-4/5">
          <div className="md:min-h-[450px]">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
