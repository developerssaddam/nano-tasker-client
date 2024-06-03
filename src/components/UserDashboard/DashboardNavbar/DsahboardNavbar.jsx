import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";

const DsahboardNavbar = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between navbar items-center  max-w-5xl mx-auto">
          <div className="">
            <Link to="/">
              <h1 className="text-lg md:text-3xl font-semibold md:font-bold text-gray-600">
                Nano<span className="text-primary_color">Tasker</span>
              </h1>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="text-xs md:text-base md:font-semibold text-gray-600">
              <h2>Balance: 8</h2>
              <h2>worker</h2>
            </div>

            <div className="flex flex-col items-center">
              <div className="dropdown btn-sm btn-ghost btn-circle">
                <img
                  tabIndex={0}
                  role="button"
                  className="w-10 rounded-full"
                  alt="profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>

              <h2 className="text-center text-xs md:text-base">
                name username
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
    </div>
  );
};

export default DsahboardNavbar;
