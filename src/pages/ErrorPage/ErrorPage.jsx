import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import lottieImg from "../../assets/404.json";

const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <title>NanoTasker | Error</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen">
        <div>
          <Lottie animationData={lottieImg} loop={true} />
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold font-oswald ">Page Not Found</h2>
            <Link to="/" className="btn btn-sm bg-[#C738BD] text-white">
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
