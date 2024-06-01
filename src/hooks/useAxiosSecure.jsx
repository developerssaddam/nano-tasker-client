import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "",
  withCredentials: true,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
