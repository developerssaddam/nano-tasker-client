import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const UpdateMytask = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  // Get current data.
  const { data: currentData, isPending } = useQuery({
    queryKey: ["updateData", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/task/${id}`);
      return res.data;
    },
  });

  if (isPending) {
    return;
  }

  // handleUpdateTaskForm
  const handleUpdateTaskForm = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const details = form.details.value;
    const submissionInfo = form.submissionInfo.value;

    const updatedValue = {
      title,
      details,
      submissionInfo,
    };

    // Call update api
    axiosSecure.patch(`/task/update/${id}`, updatedValue).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your task updated successfull!",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        navigate("/dashboard/mytasks");
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard | Update task</title>
      </Helmet>

      <div className="bg-[#EEF1F4] flex justify-center items-center min-h-[550px] py-10">
        <div className="w-full max-w-md p-2 md:p-8 space-y-3 rounded-xl bg-white text-gray-700">
          <h1 className="text-2xl font-bold text-center">Update-Task</h1>
          <form onSubmit={handleUpdateTaskForm} className="space-y-6">
            <div className="space-y-1 text-sm">
              <label className="block text-gray-400">Title</label>
              <input
                name="title"
                type="text"
                defaultValue={currentData.title}
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
            </div>

            <div className="space-y-1 text-sm">
              <label className="block text-gray-400">Quantity</label>
              <input
                name="quantity"
                type="text"
                readOnly
                defaultValue={currentData.quantity}
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
            </div>

            <div className="space-y-1 text-sm">
              <label className="block text-gray-400">Payable-Amount</label>
              <input
                name="amount"
                type="text"
                readOnly
                defaultValue={currentData.amount}
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
            </div>

            <div className="space-y-1 text-sm">
              <label className="block text-gray-400">Details</label>
              <input
                name="details"
                type="text"
                defaultValue={currentData.details}
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
            </div>

            <div className="space-y-1 text-sm">
              <label className="block text-gray-400">SubmissionInfo</label>
              <input
                name="submissionInfo"
                type="text"
                defaultValue={currentData.submissionInfo}
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
            </div>

            <button className="block w-full p-3 text-center rounded-sm text-white bg-primary_color">
              Update-Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMytask;
