import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const TaskList = () => {
  const axiosSecure = useAxiosSecure();

  // Load all task data.
  const { data: allTask, isPending } = useQuery({
    queryKey: ["allTask"],
    queryFn: async () => {
      const res = await axiosSecure.get("/alltask");
      return res.data;
    },
  });

  if (isPending) {
    return;
  }

  return (
    <div className="my-10">
      <Helmet>
        <title>Dashboard | Task-List</title>
      </Helmet>

      <h1 className="text-2xl md:text-4xl font-bold text-center underline mb-8 md:mb-14 text-gray-700">
        All Task Here
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {allTask.map((task, index) => (
          <div
            key={index}
            className="task_item border border-primary_color rounded-lg shadow-md"
          >
            <img
              className="w-full h-[250px] object-cover rounded-t-lg"
              src={task.photo}
              alt=""
            />

            <div className="p-2">
              <h2 className="text-xl font-bold text-gray-700 mb-3">
                {task.title}
              </h2>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Buyer-Name :{" "}
                <span className="text-gray-500">{task.creator_name}</span>
              </h3>

              <div className="flex justify-between mb-2">
                <p className="text-red-500">Dateline : {task.date}</p>
                <p className="text-gray-500">
                  Quantity :{" "}
                  <span className=" text-lg font-bold text-primary_color">
                    {task.quantity}
                  </span>{" "}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-500">
                  Payable-amount :{" "}
                  <span className="font-semibold text-primary_color">
                    {task.amount} Coin
                  </span>{" "}
                </p>
                <Link to={`/dashboard/task/details/${task._id}`}>
                  <button className="btn btn-sm bg-primary_color text-white">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
