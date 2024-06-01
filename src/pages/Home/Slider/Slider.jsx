import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
} from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";
import img1 from "../../../assets/img1.webp";
import img2 from "../../../assets/img2.avif";
import img3 from "../../../assets/img3.avif";

const Slider = () => {
  return (
    <div className="banner_slider">
      {" "}
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          EffectFade,
          Autoplay,
        ]}
        slidesPerView={1}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div
            className="hero h-[500px]"
            style={{
              backgroundImage: `url(${img1})`,
            }}
          >
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-3xl">
                <h1 className="mb-3 text-3xl font-bold">
                  Your Path to Knowledge Begins Here.
                </h1>
                <p className="mb-3">
                  Your Path to Knowledge Begins Here: Embark on a journey of
                  learning and growth with expert-led courses designed to unlock
                  your full potential.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="hero h-[500px]"
            style={{
              backgroundImage: `url(${img2})`,
            }}
          >
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-3xl">
                <h1 className="mb-5 text-3xl font-bold">
                  Empowering Minds, Transforming Futures.
                </h1>
                <p className="mb-5">
                  Empowering Minds, Transforming Futures: Unlock your potential
                  through innovative learning experiences, equipping you with
                  skills and knowledge for a brighter tomorrow.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="hero h-[500px]"
            style={{
              backgroundImage: `url(${img3})`,
            }}
          >
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-3xl">
                <h1 className="mb-5 text-3xl font-bold">
                  Master Skills, Achieve Dreams.
                </h1>
                <p className="mb-5">
                  Master Skills, Achieve Dreams: Gain the expertise you need to
                  reach your goals with our comprehensive, hands-on learning
                  programs.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
