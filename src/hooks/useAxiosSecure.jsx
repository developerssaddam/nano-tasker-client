import axios from "axios";
import useAuth from "./useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://nanotasker-server.vercel.app",
});

const useAxiosSecure = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  // Add a request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("accessToken");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const status = error.response.status;
      if (status === 401 || status === 400 || status === 403) {
        logoutUser().then(() => {
          Swal.fire({
            text: "Forbidden access!",
            icon: "error",
          });
          navigate("/login");
        });
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
