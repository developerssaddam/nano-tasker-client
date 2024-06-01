import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import TopHeader from "../components/TopHeader/TopHeader";

const MainLayout = () => {
  return (
    <div>
      <div>
        <TopHeader />
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
