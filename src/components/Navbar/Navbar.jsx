import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 max-w-5xl mx-auto">
      <div className="navbar-start">
        <Link to="/">
          <h1 className="text-3xl font-bold text-gray-600">
            Nano<span className="text-primary_color">Tasker</span>
          </h1>
        </Link>
      </div>

      <div className="navbar-end">
        <div className="navbar-center hidden lg:flex">
          <ul id="menu" className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="https://www.youtube.com/watch?v=ZtufUJhJzao">
                Watch-Demo
              </NavLink>
            </li>

            <Link to="/login">
              <button className="font-semibold bg-primary_color text-white rounded-3xl mx-3 px-6 py-2 text-base">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="font-semibold bg-primary_color text-white rounded-3xl mx-3 px-6 py-2 text-base">
                Register
              </button>
            </Link>
          </ul>
        </div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FiMenu className="text-2xl" />
          </div>
          <ul
            id="menu"
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="https://www.youtube.com/watch?v=ZtufUJhJzao">
                Watch-Demo
              </NavLink>
            </li>

            <li>
              <NavLink to="/login">Login</NavLink>
            </li>

            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
