import { Navigate } from "react-router-dom";
import loaderImg from "../assets/loading.gif";
import useSingleUser from "../hooks/useSingleUser";
import useAuth from "../hooks/useAuth";

const WorkerPrivateRoute = ({ children }) => {
  const { singleUser, isPending } = useSingleUser();
  const { logoutUser } = useAuth();

  if (isPending) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img src={loaderImg} alt="" />
      </div>
    );
  }

  // current user role
  const role = singleUser?.role;

  // Validation user.
  if (role !== "Worker") {
    logoutUser();
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  } else {
    return <div>{children}</div>;
  }
};

export default WorkerPrivateRoute;
