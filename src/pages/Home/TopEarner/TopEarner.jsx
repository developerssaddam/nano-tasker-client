import img1 from "../../../assets/task.png";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const TopEarner = () => {
  return (
    <>
      <SectionTitle title={"Top Earners"} />
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
                  Available Coin : 66
                </h2>
                <p className="text-gray-500">Total Completed task : 20</p>
              </div>
            </div>

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
                  Available Coin : 66
                </h2>
                <p className="text-gray-500">Total Completed task : 20</p>
              </div>
            </div>

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
                  Available Coin : 66
                </h2>
                <p className="text-gray-500">Total Completed task : 20</p>
              </div>
            </div>

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
                  Available Coin : 66
                </h2>
                <p className="text-gray-500">Total Completed task : 20</p>
              </div>
            </div>

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
                  Available Coin : 66
                </h2>
                <p className="text-gray-500">Total Completed task : 20</p>
              </div>
            </div>

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
                  Available Coin : 66
                </h2>
                <p className="text-gray-500">Total Completed task : 20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopEarner;
