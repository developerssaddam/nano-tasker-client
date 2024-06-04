import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import moment from "moment";
import useSingleUser from "../../../../hooks/useSingleUser";

const AddNewTasks = () => {
  const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { singleUser } = useSingleUser();

  // handleAddNewTask
  const handleAddNewTask = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const details = form.details.value;
    const quantity = parseInt(form.quantity.value);
    const amount = parseInt(form.amount.value);
    const date = form.date.value;
    const submissionInfo = form.submissionInfo.value;
    const photo = form.photo.files[0];

    // validation
    if (
      !title ||
      !details ||
      !quantity ||
      !amount ||
      !date ||
      !submissionInfo ||
      !photo
    ) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "All fields are required!",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    // validate available and payable coin
    const availableCoin = singleUser?.totalCoin;
    const totalPayableCoin = quantity * amount;

    if (totalPayableCoin > availableCoin) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Your balance is low. Please purchase coin!",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    // Photo upload to imgbb and get url
    const res = await axiosPublic.post(
      `https://api.imgbb.com/1/upload?key=${img_hosting_key}`,
      { image: photo },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Now save data to db
    if (res.data.success) {
      const newTask = {
        title,
        details,
        quantity,
        amount,
        date,
        submissionInfo,
        photo: res.data.data.url,
        creator_name: user?.displayName,
        creator_email: user?.email,
        time: moment().format("h:mm:ss a"),
      };

      await axiosSecure.post("/task/create", newTask).then((res) => {
        if (res?.data?.acknowledged) {
          axiosSecure
            .put("/users/singleuser", {
              email: user?.email,
              updatedCoin: availableCoin - totalPayableCoin,
            })
            .then((res) => {
              if (res?.data?.acknowledged) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "You have successfully create task!",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            });
        }
      });
    }
  };
  return (
    <div>
      <Helmet>
        <title>Dashboard | Add new task</title>
      </Helmet>

      <div className="flex justify-center items-center min-h-[550px] py-10">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg text-gray-700">
          <h1 className="text-2xl font-bold text-center">Add New Task</h1>
          <form onSubmit={handleAddNewTask} className="space-y-6">
            <div className="space-y-1 text-sm">
              <label className="block text-gray-400">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
            </div>

            <div className="space-y-1 text-sm relative">
              <label className="block text-gray-400">Details</label>
              <input
                type="text"
                name="details"
                placeholder="Details"
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
            </div>

            <div className="space-y-1 text-sm relative">
              <label className="block text-gray-400">Quantity</label>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
            </div>

            <div className="space-y-1 text-sm relative">
              <label className="block text-gray-400">Payable-Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Payable-Amount"
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
            </div>

            <div className="space-y-1 text-sm relative">
              <label className="block text-gray-400">Completion-Date</label>
              <input
                type="date"
                name="date"
                placeholder="Completion-Date"
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
            </div>

            <div className="space-y-1 text-sm relative">
              <label className="block text-gray-400">Submission-info</label>
              <input
                type="text"
                name="submissionInfo"
                placeholder="Submission-info"
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
            </div>

            <div className="space-y-1 text-sm relative">
              <label className="block text-gray-400">Photo</label>
              <input
                type="file"
                name="photo"
                placeholder="Photo"
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
            </div>

            <button className="block w-full p-3 text-center rounded-sm text-white bg-[#C738BD]">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewTasks;
