import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import Chart from "../../../../components/Chart/Chart";

const TaskCreatorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [singleSubmission, getSingleSubmission] = useState({});

  // Load chart data.
  const { data: chartData = [] } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/taskcreator/stats/${user?.email}`);
      return res.data;
    },
  });

  // Load all data which is status is pending
  const {
    data: myTask,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["myTask", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/mytask/worker/submission/status/pending?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isPending) {
    return;
  }

  // handleShowsubmissionInfo
  const handleShowsubmissionInfo = async (id) => {
    // showModal
    document.getElementById("viewModal").showModal();
    const res = await axiosSecure.get(`/single/submission/data?id=${id}`);
    getSingleSubmission(res.data);
  };

  // handleSubmissionApprove
  const handleSubmissionApprove = async (id) => {
    await axiosSecure.get(`/single/submission/data?id=${id}`).then((res) => {
      if (res.data) {
        axiosSecure
          .patch("/update/worker/totalcoin/and/submission/approve", res.data)
          .then((res) => {
            if (
              res.data?.increaseWorkerTotalCoin?.acknowledged &&
              res.data?.updateStatus?.acknowledged
            ) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                text: "You have successfully approve this submission!",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          });
      }
    });
  };

  // handleSubmissionReject
  const handleSubmissionReject = async (id) => {
    await axiosSecure
      .patch("/update/worker/status/rejected", { id })
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            text: "You have successfully rejected this submission!",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
  };

  return (
    <div className="max-w-5xl mx-auto md:py-10">
      <div className="states_area flex justify-center md:mb-5">
        <Chart chartData={chartData} />
      </div>

      <div className="review_table">
        <h1 className="text-2xl md:text-4xl text-gray-600 font-semibold text-center mb-3">
          Task-Review
        </h1>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-[#EEF1F4]">
              <tr className="text-lg">
                <th>Sl-No</th>
                <th>Worker-Name</th>
                <th>Worker-Email</th>
                <th>Payable-Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myTask.map((task, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{task.worker_name}</td>
                  <td>{task.worker_email}</td>
                  <td>{task.amount} Coin</td>
                  <td>
                    <button
                      className="btn btn-sm bg-primary_color text-white"
                      onClick={() => handleShowsubmissionInfo(task._id)}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleSubmissionApprove(task._id)}
                      className="btn btn-sm bg-green-500 text-white"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleSubmissionReject(task._id)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal-area */}
      <dialog id="viewModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Submission-Details</h3>
          <p className="py-4">{singleSubmission?.submissionInfo}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default TaskCreatorHome;
