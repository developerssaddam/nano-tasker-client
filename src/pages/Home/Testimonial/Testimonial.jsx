import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Testimonial.css";

const Testimonial = () => {
  return (
    <div className="testimonial_area max-w-5xl mx-auto mb-14">
      <SectionTitle subtitle={"What Our Clients Say"} title={"TESTIMONIALS"} />

      <Swiper
        modules={[Navigation, EffectFade]}
        navigation
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="text-center px-16">
            <div className="flex flex-col items-center">
              <Rating
                style={{
                  maxWidth: 180,
                  marginBottom: "15px",
                }}
                value="4"
                readOnly
              />
              <FaQuoteLeft className="text-5xl mb-5 text-primary_color" />
            </div>
            <p className="text-sm font-medium text-gray-500 mb-2">
              Awesome site! Completing tasks is simple and rewarding. The user
              interface is intuitive, and payments are always on time. Highly
              recommended for anyone looking to earn extra money easily!
            </p>
            <h2 className="text-xl font-semibold uppercase text-primary_color">
              Olivia Clark
            </h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="text-center px-16">
            <div className="flex flex-col items-center">
              <Rating
                style={{
                  maxWidth: 180,
                  marginBottom: "15px",
                }}
                value="5"
                readOnly
              />
              <FaQuoteLeft className="text-5xl mb-5 text-primary_color" />
            </div>
            <p className="text-sm font-medium text-gray-500 mb-2">
              Highly efficient microtask site! Tasks are engaging and payouts
              are prompt. A great way to earn extra income in my spare time.
            </p>
            <h2 className="text-xl font-semibold uppercase text-primary_color">
              Daniel Davis
            </h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="text-center px-16">
            <div className="flex flex-col items-center">
              <Rating
                style={{
                  maxWidth: 180,
                  marginBottom: "15px",
                }}
                value="3"
                readOnly
              />
              <FaQuoteLeft className="text-5xl mb-5 text-primary_color" />
            </div>
            <p className="text-sm font-medium text-gray-500 mb-2">
              Wonderful platform! The tasks are simple and well-organized.
              Payments are always on time. A reliable way to earn extra money!
            </p>
            <h2 className="text-xl font-semibold uppercase text-primary_color">
              James Brown
            </h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="text-center px-16">
            <div className="flex flex-col items-center">
              <Rating
                style={{
                  maxWidth: 180,
                  marginBottom: "15px",
                }}
                value="4"
                readOnly
              />
              <FaQuoteLeft className="text-5xl mb-5 text-primary_color" />
            </div>
            <p className="text-sm font-medium text-gray-500 mb-2">
              Awesome experience! The tasks are easy to complete and the rewards
              are great. Quick and hassle-free payments every time!
            </p>
            <h2 className="text-xl font-semibold uppercase text-primary_color">
              Emily Johnson
            </h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="text-center px-16">
            <div className="flex flex-col items-center">
              <Rating
                style={{
                  maxWidth: 180,
                  marginBottom: "15px",
                }}
                value="5"
                readOnly
              />
              <FaQuoteLeft className="text-5xl mb-5 text-primary_color" />
            </div>
            <p className="text-sm font-medium text-gray-500 mb-2">
              Fantastic microtask site! Easy tasks, prompt payments, and a
              seamless user experience. Perfect for earning extra cash in my
              free time.!
            </p>
            <h2 className="text-xl font-semibold uppercase text-primary_color">
              Michael Rivera
            </h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonial;
