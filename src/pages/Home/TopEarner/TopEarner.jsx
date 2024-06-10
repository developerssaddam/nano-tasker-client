import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const TopEarner = () => {
  const axiosPublic = useAxiosPublic();

  // Load top earner users
  const { data = [] } = useQuery({
    queryKey: ["topEarner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/topearner");
      return res.data;
    },
  });

  return (
    <>
      <SectionTitle title={"Top Earners"} />
      <div className="bg-[#EEF1F4] p-1 rounded-xl md:rounded-none md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((user, index) => (
              <div
                key={index}
                className="features_card p-8 text-center shadow-xl bg-white rounded-xl"
              >
                <div className="flex justify-center mb-4">
                  <img
                    className="w-40 h-40 rounded-full border-4 border-primary_color p-1"
                    src={user?.photo}
                    alt=""
                  />
                </div>
                <div>
                  <h2 className="text-2xl text-gray-700 mb-3">
                    Available Coin : {user?.totalCoin}
                  </h2>
                  <p className="text-gray-500">
                    Total Completed task : {user?.total_task_completetion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopEarner;
