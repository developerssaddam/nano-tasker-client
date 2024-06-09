import { Helmet } from "react-helmet-async";
import useAllUsers from "../../../../hooks/useAllUsers";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, isPending, refetch] = useAllUsers();
  const axiosSecure = useAxiosSecure();

  if(isPending){
    return;
  }

  // Get all user who have role is "worker"
  const allWorker = users.filter((user) => user.role === "Worker");

  // handleDeleteUser
  const handleDeleteUser = (id) => {
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
        await axiosSecure
          .delete(`/user/delete/byadmin?id=${id}`)
          .then((res) => {
            if (res.data.acknowledged) {
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  // handleRoleChange
  const handleRoleChange = ({ id, value }) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to change user role!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure
          .put("/update/userrole/byadmin", { id, value })
          .then((res) => {
            if (res.data.acknowledged) {
              Swal.fire({
                title: "Success!",
                text: "User role is updated!",
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-4 md:py-10">
      <Helmet>
        <title>Dashboard | Admin Home</title>
      </Helmet>
      <h2 className="font-bold text-2xl text-gray-600 text-center mb-3">
        Manage Users
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-[#EEF1F4] text-base font-semibold">
              <tr>
                <th>Sl-No</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Available-Coin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allWorker.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user.photo}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.totalCoin}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Remove
                    </button>

                    <button className="btn btn-sm bg-primary_color text-white">
                      <select
                        className="bg-primary_color"
                        defaultValue=""
                        onChange={(e) =>
                          handleRoleChange({
                            id: user._id,
                            value: e.target.value,
                          })
                        }
                      >
                        <option value="" disabled>
                          Update Role
                        </option>
                        <option>Admin</option>
                        <option>Task-Creator</option>
                        <option>Worker</option>
                      </select>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
