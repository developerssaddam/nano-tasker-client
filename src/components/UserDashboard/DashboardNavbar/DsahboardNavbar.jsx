import { Link, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useSingleUser from "../../../hooks/useSingleUser";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoMdSettings } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

const DsahboardNavbar = () => {
  const { user } = useAuth();
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const { singleUser, isPending } = useSingleUser();
  const axiosSecure = useAxiosSecure();
  const [notificationShow, setNotificationShow] = useState(false);
  const notificationRef = useRef(null);

  // Load notifications data
  const { data: notifications = [] } = useQuery({
    queryKey: ["notification", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/notification?email=${user?.email}`);
      return res.data;
    },
  });

  // handleNotifications
  const handleNotifications = () => {
    setNotificationShow(!notificationShow);
  };

  // handleClickOutSite
  const handleClickOutSite = (e) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(e.target)
    ) {
      setNotificationShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSite, true);
  }, []);

  if (isPending) {
    return "Loading...";
  }
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
    <>
      <div className="bg-slate-300">
        <div className="flex justify-between py-2 items-center">
          <Link to="/">
            <h1 className="text-xs md:text-3xl font-semibold md:font-bold text-gray-600">
              Nano<span className="text-primary_color">Tasker</span>
            </h1>
          </Link>

          <div className="flex items-center md:gap-2">
            <div className="text-xs font-medium md:text-base md:font-semibold text-gray-600">
              <h2>
                Balance:{" "}
                <span className="text-primary_color">
                  {singleUser?.totalCoin} Coin
                </span>{" "}
              </h2>
              <h2>{singleUser?.role}</h2>
            </div>

            <div className="flex flex-col items-center">
              <div className="dropdown btn-xs btn-ghost btn-circle">
                <img
                  tabIndex={0}
                  role="button"
                  className="w-full h-full rounded-full"
                  alt="profile"
                  src={singleUser?.photo}
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
                {singleUser?.name}
              </h2>
            </div>

            <div>
              <button
                onClick={handleNotifications}
                className="btn btn-sm md:btn-md btn-ghost btn-circle"
              >
                <div className="indicator">
                  <IoIosNotifications className="text-base md:text-2xl text-info" />
                  <div className="badge bg-primary_color text-white badge-sm indicator-item">
                    {notifications.length}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* notification-area */}
      {notificationShow && (
        <div
          ref={notificationRef}
          className="w-80 max-h-[350px] overflow-auto bg-[#EEF1F4] absolute p-4 top-[65px] right-[15px] z-50"
        >
          <div className="flex justify-between border-b pb-2 border-primary_color">
            <h2 className="text-xl font-medium text-gray-500">Notifications</h2>
            <button className="text-gray-500 text-xl">
              <IoMdSettings />
            </button>
          </div>
          <div>
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="item border-b border-primary_color pb-2 mb-5"
              >
                <p className="text-sm font-medium text-gray-500 py-2">
                  {notification.message}
                </p>

                <h2 className="text-sm font-semibold text-gray-700">
                  Date & Time : {notification.Time}
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DsahboardNavbar;
