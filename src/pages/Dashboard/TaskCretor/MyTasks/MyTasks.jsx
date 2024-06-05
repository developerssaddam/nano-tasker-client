import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MyTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Load data
  const { data: myTask, isPending } = useQuery({
    queryKey: ["mytask", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all/task/mycreated?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isPending) {
    return "Loading...";
  }

  // TimeToString
  const timeToString = (timeValue) => {
    const [time, modifier] = timeValue.split(" ");
    let [hours, minutes, seconds] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "pm") {
      hours = parseInt(hours, 10) + 12;
    }

    return new Date(`1970-01-01T${hours}:${minutes}:${seconds}Z`);
  };

  // Sort MyTask in descending order based on the time property
  const sortedData = myTask.sort(
    (a, b) => timeToString(b.time) - timeToString(a.time)
  );

  return (
    <div className="max-w-5xl mx-auto py-4 md:py-10">
      <h2 className="font-bold text-2xl text-gray-600 text-center mb-3">
        My Task-List
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-[#EEF1F4] text-base font-semibold">
              <tr>
                <th>Sl-No</th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Payable-Amount (per task)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((task, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{task.title}</td>
                  <td>{task.quantity}</td>
                  <td>{task.amount}</td>
                  <td>
                    <Link to={`/dashboard/update/mytask/${task._id}`}>
                      <button className="btn btn-sm btn-warning mr-3 text-white">
                        <FaRegEdit />
                      </button>
                    </Link>
                    <button className="btn btn-sm btn-error text-white">
                      <FaRegTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update modal */}
      <dialog id="taskUpdateModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyTasks;
