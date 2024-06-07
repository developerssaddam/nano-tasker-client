import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import moment from "moment";
import Swal from "sweetalert2";

const TaskDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Load single task data.
  const { data: singleTask, isPending } = useQuery({
    queryKey: ["singleTask", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/task/${id}`);
      return res.data;
    },
  });

  if (isPending) {
    return "Loading...";
  }

  const {
    _id,
    photo,
    title,
    details,
    quantity,
    amount,
    date,
    creator_name,
    creator_email,
  } = singleTask;

  // handleSubmissionDetails
  const handleSubmissionDetails = (e) => {
    e.preventDefault();
    const submissionInfo = e.target.submissionInfo?.value;

    // validation
    if (!submissionInfo) {
      return Swal.fire({
        icon: "error",
        title: "Submission info is required!",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    const submissionDetails = {
      task_id: _id,
      title,
      details,
      photo,
      amount,
      worker_email: user?.email,
      worker_name: user?.displayName,
      creator_name,
      creator_email,
      submissionInfo,
      date: moment().format("MMM Do YY"),
      status: "pending",
    };

    // Now data save to submission collection
    axiosSecure.post("/submission/create", submissionDetails).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          text: "Your have successfully submit the task!",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
        navigate("/dashboard/tasklist");
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <Helmet>
        <title>Dashboard | Task-Details</title>
      </Helmet>

      <h1 className="text-2xl md:text-4xl text-gray-600 font-bold underline text-center mb-8">
        Task-Details
      </h1>

      <div>
        <img
          className="w-full border-4 border-primary_color rounded-xl object-cover mb-5"
          src={photo}
          alt=""
        />

        <div className="p-1 md:p-0">
          {/* row */}
          <div className="flex mb-3 gap-5">
            <div className="w-1/6">
              <h1 className="text-base md:text-xl font-semibold text-gray-700">
                Title{" "}
              </h1>
            </div>
            <div className="w-5/6">
              <p className="text-sm md:text-lg font-medium text-gray-500">
                {" "}
                : {title}
              </p>
            </div>
          </div>

          {/* row */}
          <div className="flex mb-3 gap-5">
            <div className="w-1/6">
              <h1 className="text-base md:text-xl font-semibold text-gray-700">
                Details{" "}
              </h1>
            </div>
            <div className="w-5/6">
              <p className="text-sm md:text-lg font-medium text-gray-500">
                {" "}
                : {details}
              </p>
            </div>
          </div>

          {/* row */}
          <div className="flex mb-3 gap-5">
            <div className="w-1/6">
              <h1 className="text-base md:text-xl font-semibold text-gray-700">
                Quantity{" "}
              </h1>
            </div>
            <div className="w-5/6">
              <p className="text-sm md:text-lg font-medium text-gray-500">
                {" "}
                : {quantity}
              </p>
            </div>
          </div>

          {/* row */}
          <div className="flex mb-3 gap-5">
            <div className="w-1/6">
              <h1 className="text-base md:text-xl font-semibold text-gray-700">
                Payable-Amount{" "}
              </h1>
            </div>
            <div className="w-5/6">
              <p className="text-sm md:text-lg font-medium text-gray-500">
                {" "}
                : {amount} Coin
              </p>
            </div>
          </div>

          {/* row */}
          <div className="flex mb-3 gap-5 ">
            <div className="w-1/6">
              <h1 className="text-base md:text-xl font-semibold text-gray-700">
                Dateline{" "}
              </h1>
            </div>
            <div className="w-5/6">
              <p className="text-sm md:text-lg font-medium text-gray-500">
                {" "}
                : {date}
              </p>
            </div>
          </div>

          {/* row */}
          <div className="flex mb-3 gap-5">
            <div className="w-1/6">
              <h1 className="text-base md:text-xl font-semibold text-gray-700">
                Creator-Name{" "}
              </h1>
            </div>
            <div className="w-5/6">
              <p className="text-sm md:text-lg font-medium text-gray-500">
                {" "}
                : {creator_name}
              </p>
            </div>
          </div>

          {/* row */}
          <div className="flex mb-3 gap-5">
            <div className="w-1/6">
              <h1 className="text-base md:text-xl font-semibold text-gray-700">
                Crator-Email{" "}
              </h1>
            </div>
            <div className="w-5/6">
              <p className="text-sm md:text-lg font-medium text-gray-500">
                {" "}
                : {creator_email}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full space-y-3 my-5 md:my-8">
          <form onSubmit={handleSubmissionDetails} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-xl text-gray-700 font-bold">
                Submission-Details
              </label>
              <textarea
                name="submissionInfo"
                placeholder="Submission details"
                className="w-full border border-primary_color px-5 py-3 rounded-lg"
                rows={8}
              ></textarea>
            </div>
            <button className="block w-full p-3 text-center rounded-sm bg-primary_color text-white">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
