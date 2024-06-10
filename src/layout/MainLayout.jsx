import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import TopHeader from "../components/TopHeader/TopHeader";
import useAuth from "../hooks/useAuth";
import DsahboardNavbar from "../components/UserDashboard/DashboardNavbar/DsahboardNavbar";

const MainLayout = () => {
  const { user } = useAuth();
  return (
    <div>
      <div>
        <TopHeader />
        {user ? <DsahboardNavbar /> : <Navbar />}
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
