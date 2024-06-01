import { Helmet } from "react-helmet-async";
import Slider from "./Slider/Slider";
import Features from "./Features/Features";
import HowItWork from "./HowItWork/HowItWork";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>NanoTasker | Home</title>
      </Helmet>

      <Slider />
      <Features />
      <HowItWork />
    </div>
  );
};

export default Home;
