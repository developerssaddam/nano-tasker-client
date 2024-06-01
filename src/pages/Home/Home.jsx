import { Helmet } from "react-helmet-async";
import Slider from "./Slider/Slider";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>NanoTasker | Home</title>
      </Helmet>

      <div className="banner">
        <Slider />
      </div>
    </div>
  );
};

export default Home;
