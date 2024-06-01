import { Helmet } from "react-helmet-async";
import Slider from "./Slider/Slider";
import Features from "./Features/Features";
import HowItWork from "./HowItWork/HowItWork";
import TopEarner from "./TopEarner/TopEarner";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>NanoTasker | Home</title>
      </Helmet>

      <Slider />
      <Features />
      <HowItWork />
      <TopEarner />
      <Testimonial />
    </div>
  );
};

export default Home;
