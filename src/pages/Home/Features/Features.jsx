import img1 from "../../../assets/task.png";
import img2 from "../../../assets/createtask.avif";
import img3 from "../../../assets/payment.avif";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Features = () => {
  return (
    <>
      <SectionTitle title={"Our-Features."} />
      <div className="bg-[#EEF1F4] p-1 rounded-xl md:rounded-none md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="features_card p-8 text-center shadow-xl bg-white rounded-xl">
              <div className="flex justify-center mb-4">
                <img
                  className="w-40 h-40 rounded-full border-4 border-primary_color p-1"
                  src={img1}
                  alt=""
                />
              </div>
              <div>
                <h2 className="text-2xl text-gray-700 mb-3">
                  Earn Coins by Completing Tasks.
                </h2>
                <p className="text-gray-500">
                  Participate in educational activities and challenges to
                  collect coins, unlocking rewards and enhancing your learning
                  experience.
                </p>
              </div>
            </div>

            <div className="features_card p-8 text-center shadow-xl bg-white rounded-xl">
              <div className="flex justify-center mb-4">
                <img
                  className="w-40 h-40 rounded-full border-4 border-primary_color p-1"
                  src={img2}
                  alt=""
                />
              </div>
              <div>
                <h2 className="text-2xl text-gray-700 mb-3">
                  Create and Manage Tasks.
                </h2>
                <p className="text-gray-500">
                  Easily organize, track, and complete your tasks with our
                  intuitive tools, enhancing productivity and efficiency in your
                  learning journey.
                </p>
              </div>
            </div>

            <div className="features_card p-8 text-center shadow-xl bg-white rounded-xl">
              <div className="flex justify-center mb-4">
                <img
                  className="w-40 h-40 rounded-full border-4 border-primary_color p-1"
                  src={img3}
                  alt=""
                />
              </div>
              <div>
                <h2 className="text-2xl text-gray-700 mb-3">
                  Secure Payments.
                </h2>
                <p className="text-gray-500">
                  Experience peace of mind with our robust, encrypted payment
                  system, ensuring your transactions are safe, reliable, and
                  hassle-free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
