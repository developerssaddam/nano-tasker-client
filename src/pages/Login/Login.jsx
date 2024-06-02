import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);

  // Show/Hide password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Helmet>
        <title>NanoTasker | Login</title>
      </Helmet>

      <div className="bg-[#EEF1F4] flex justify-center items-center min-h-[550px]">
        <div className="w-full max-w-sm p-8 space-y-3 rounded-xl bg-white text-gray-700">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <form noValidate="" action="" className="space-y-6">
            <div className="space-y-1 text-sm">
              <label className="block text-gray-400">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
            </div>

            <div className="space-y-1 text-sm relative">
              <label className="block text-gray-400">Password</label>
              <input
                type={showPassword ? "password" : "text"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />

              <span
                onClick={handleShowPassword}
                className="absolute top-[35px] right-5 cursor-pointer"
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>

              <div className="flex justify-end text-xs text-gray-400">
                <a rel="noopener noreferrer" href="#">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button className="block w-full p-3 text-center rounded-sm text-white bg-[#C738BD]">
              Sign in
            </button>
          </form>

          <div className="flex items-center w-full my-4">
            <hr className="w-full dark:text-gray-600" />
            <p className="px-3 dark:text-gray-600">OR</p>
            <hr className="w-full dark:text-gray-600" />
          </div>

          <SocialLogin />
          <p className="text-xs text-center sm:px-6 text-gray-400">
            Don`t have an account?
            <Link
              to="/register"
              className="underline text-primary_color font-bold"
            >
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
