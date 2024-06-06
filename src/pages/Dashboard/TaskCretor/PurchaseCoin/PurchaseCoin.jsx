import { Helmet } from "react-helmet-async";
import img from "../../../../assets/img33.jpg";
import { Link } from "react-router-dom";

const PurchaseCoin = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <Helmet>
        <title>Dashboard | Purchase coin</title>
      </Helmet>

      <h1 className="text-2xl md:text-4xl text-gray-600 mb-8 text-center underline">
        Chose a plane
      </h1>

      <div className="flex gap-5 flex-col md:flex-row items-center">
        <Link to={`/dashboard/payment/${1}`}>
          <div className="coin_cart border-2 rounded-lg shadow-lg p-5 bg-[#CBD5E1]">
            <div className="flex justify-center mb-4">
              <img src={img} alt="" />
            </div>
            <h2 className="text-2xl font-medium text-gray-500 text-center">
              10 coins ={" "}
              <span className="text-primary_color font-bold">1 $</span>
            </h2>
          </div>
        </Link>

        <Link to={`/dashboard/payment/${9}`}>
          <div className="coin_cart border-2 rounded-lg shadow-lg p-5 bg-[#CBD5E1]">
            <div className="flex justify-center mb-4">
              <img src={img} alt="" />
            </div>
            <h2 className="text-2xl font-medium text-gray-500 text-center">
              100 coins ={" "}
              <span className="text-primary_color font-bold">9 $</span>
            </h2>
          </div>
        </Link>

        <Link to={`/dashboard/payment/${19}`}>
          <div className="coin_cart border-2 rounded-lg shadow-lg p-5 bg-[#CBD5E1]">
            <div className="flex justify-center mb-4">
              <img src={img} alt="" />
            </div>
            <h2 className="text-2xl font-medium text-gray-500 text-center">
              500 coins ={" "}
              <span className="text-primary_color font-bold">19 $</span>
            </h2>
          </div>
        </Link>

        <Link to={`/dashboard/payment/${39}`}>
          <div className="coin_cart border-2 rounded-lg shadow-lg p-5 bg-[#CBD5E1]">
            <div className="flex justify-center mb-4">
              <img src={img} alt="" />
            </div>
            <h2 className="text-2xl font-medium text-gray-500 text-center">
              1000 coins ={" "}
              <span className="text-primary_color font-bold">39 $</span>
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PurchaseCoin;
