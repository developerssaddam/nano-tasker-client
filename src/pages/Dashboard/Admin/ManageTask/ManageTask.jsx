import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { IoIosEye } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

const ManageTask = () => {
  const axiosSecure = useAxiosSecure();
  const [task, setTask] = useState({});

  // Load all task data.
  const { data: allTask = [], refetch } = useQuery({
    queryKey: ["allTaskList"],
    queryFn: async () => {
      const res = await axiosSecure.get("/alltask");
      return res.data;
    },
  });

  // handleViewTaskDetails
  const handleViewTaskDetails = async (id) => {
    document.getElementById("taskDetailsModal").showModal();
    await axiosSecure.get(`/task/${id}`).then((res) => {
      setTask(res.data);
    });
  };

  // handleDeleteTaskByAdmin
  const handleDeleteTaskByAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/task/${id}`).then((res) => {
          if (res.data.acknowledged) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Task has been deleted successfully!",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-4 md:py-10">
      <Helmet>
        <title>Dashboard | Admin ManageTask</title>
      </Helmet>
      <h2 className="font-bold text-2xl text-gray-600 text-center mb-3">
        Manage Task List
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#EEF1F4] text-base font-semibold">
            <tr>
              <th>Sl-No</th>
              <th>Task-Title</th>
              <th>TaskCreator Name</th>
              <th>TaskCount</th>
              <th>Coin-Needed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allTask.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{task.title}</td>
                <td>{task.creator_name}</td>
                <td>{task.quantity}</td>
                <td>{task.amount}</td>
                <td>
                  <button
                    onClick={() => handleViewTaskDetails(task._id)}
                    className="btn btn-sm bg-yellow-500 text-white mr-2"
                  >
                    <IoIosEye />
                  </button>
                  <button
                    onClick={() => handleDeleteTaskByAdmin(task._id)}
                    className="btn btn-sm bg-red-500 text-white"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal-area */}
      <dialog id="taskDetailsModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{task?.title}</h3>
          <div className="task_item border rounded-lg">
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
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageTask;
