import { Link, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAllUsers from "../../../hooks/useAllUsers";

const DsahboardNavbar = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const [users, isPending] = useAllUsers();
  const { user } = useAuth();

  if (isPending) {
    return "Loading...";
  }

  // Get current user.
  const currentUser = users.find((dbUser) => dbUser?.email === user?.email);

  // LogoutUser
  const userLogout = () => {
    logoutUser().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logout successfull!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    });
  };

  return (
    <div className="bg-slate-300">
      <div className="flex justify-between navbar items-center">
        <div className="">
          <Link to="/">
            <h1 className="text-lg md:text-3xl font-semibold md:font-bold text-gray-600">
              Nano<span className="text-primary_color">Tasker</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="text-xs md:text-base md:font-semibold text-gray-600">
            <h2>Balance: {currentUser?.totalCoin}</h2>
            <h2>{currentUser?.role}</h2>
          </div>

          <div className="flex flex-col items-center">
            <div className="dropdown btn-sm btn-ghost btn-circle">
              <img
                tabIndex={0}
                role="button"
                className="w-10 rounded-full"
                alt="profile"
                src={currentUser?.photo}
              />
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link onClick={userLogout}>Logout</Link>
                </li>
              </ul>
            </div>
            <h2 className="text-center text-xs md:text-base">
              {currentUser?.name}
            </h2>
          </div>

          <div>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <IoIosNotifications className="text-base md:text-2xl text-info" />
                <div className="badge bg-primary_color text-white badge-sm indicator-item">
                  6
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DsahboardNavbar;
