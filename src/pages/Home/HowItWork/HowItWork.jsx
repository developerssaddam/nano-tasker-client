import img1 from "../../../assets/register.png";
import img2 from "../../../assets/compleateTask.png";
import img3 from "../../../assets/money.avif";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import "./HowItWorks.css";

const HowItWork = () => {
  return (
    <>
      <SectionTitle title={"How It Works?"} />
      <div className="my-10 p-1 rounded-xl md:rounded-none md:py-20 how_it_works bg-fixed">
        <div className="overlay bg-opacity-60"></div>
        <div className="max-w-5xl mx-auto">
          <div className="section"></div>

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
                <h2 className="text-2xl text-gray-700 mb-3">Register</h2>
                <p className="text-gray-500">
                  Join a unique micro-task completion platform. Register now to
                  access diverse opportunities and earn rewards for completing
                  tasks efficiently.
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
                <h2 className="text-2xl text-gray-700 mb-3">Complete Tasks</h2>
                <p className="text-gray-500">
                  Complete tasks on a unique micro-task completion website. Dive
                  into diverse opportunities, earn rewards, and showcase your
                  skills.
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
                <h2 className="text-2xl text-gray-700 mb-3">Earn Rewards</h2>
                <p className="text-gray-500">
                  Earn rewards on a unique micro-task completion website.
                  Complete tasks, unlock opportunities, and reap the benefits of
                  your skills and efforts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWork;
