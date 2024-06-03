import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const axiosPublic = useAxiosPublic();
  const { createUser, logoutUser } = useAuth();
  const navigate = useNavigate();

  // Show/Hide password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;

  // Form submission
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const { name, email, photo, role, password } = data;

    // First photo upload imgBB then get photo url.
    const image = photo[0];
    const res = await axiosPublic.post(
      `https://api.imgbb.com/1/upload?key=${img_hosting_key}`,
      { image },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    if (res.data.success) {
      const userInfo = {
        name,
        email,
        photo: res?.data?.data?.url,
        role,
        totalCoin: role === "Worker" ? parseInt(10) : parseInt(50),
      };

      // Register firebase
      await createUser(email, password)
        .then((result) => {
          // update name and photo
          updateProfile(result.user, {
            displayName: name,
            photoURL: userInfo?.photo,
          });

          if (result?.user) {
            // Now save data to db
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data?.acknowledged) {
                Swal.fire({
                  icon: "success",
                  text: "Registration successfull!",
                  showConfirmButton: false,
                  timer: 1500,
                });

                logoutUser();
                navigate("/login");
                reset();
              }
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  return (
    <div>
      <Helmet>
        <title>NanoTasker | Register</title>
      </Helmet>

      <div className="bg-[#EEF1F4] flex justify-center items-center min-h-[550px] py-10">
        <div className="w-full max-w-md p-2 md:p-8 space-y-3 rounded-xl bg-white text-gray-700">
          <h1 className="text-2xl font-bold text-center">Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1 text-sm">
              <label className="block text-gray-400">Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>

            <div className="space-y-1 text-sm">
              <label className="block text-gray-400">Email</label>
              <input
                type="text"
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
              {errors.email?.type === "required" && (
                <span className="text-red-500">Email is required</span>
              )}

              {errors.email?.type === "pattern" && (
                <span className="text-red-500">Invalid Email!</span>
              )}
            </div>

            <div className="space-y-1 text-sm">
              <label className="block text-gray-400">Role</label>
              <select
                className="select w-full border border-primary_color bg-[#EEF1F4]"
                {...register("role", { required: true })}
                defaultValue=""
              >
                <option value="" disabled>
                  Select one
                </option>
                <option>Worker</option>
                <option>TaskCreator</option>
              </select>
              {errors.role && (
                <span className="text-red-500">Role is required</span>
              )}
            </div>

            <div className="space-y-1 text-sm">
              <label className="block text-gray-400">Photo</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
              {errors.photo && (
                <span className="text-red-500">Photo is required</span>
              )}
            </div>

            <div className="space-y-1 text-sm relative">
              <label className="block text-gray-400">Password</label>
              <input
                type={showPassword ? "password" : "text"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md border border-primary_color bg-[#EEF1F4] focus:border-violet-400"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500">Password is required</span>
              )}

              {errors.password?.type === "minLength" && (
                <span className="text-red-500">
                  Password must be 6 characters
                </span>
              )}

              {errors.password?.type === "pattern" && (
                <span className="text-red-500">
                  Password must be one upper case one lowercase one special
                  characters and one number!
                </span>
              )}

              <span
                onClick={handleShowPassword}
                className="absolute top-[35px] right-5 cursor-pointer"
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>
            </div>

            <button className="block w-full p-3 text-center rounded-sm text-white bg-primary_color">
              Sign up
            </button>
          </form>

          <div className="flex items-center w-full my-4">
            <hr className="w-full dark:text-gray-600" />
            <p className="px-3 dark:text-gray-600">OR</p>
            <hr className="w-full dark:text-gray-600" />
          </div>

          <SocialLogin />

          <p className="text-xs text-center sm:px-6 text-gray-400">
            Already have an account?
            <Link
              to="/login"
              className="underline text-primary_color font-bold"
            >
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
