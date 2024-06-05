import { Navigate } from "react-router-dom";
import loaderImg from "../assets/loading.gif";
import useSingleUser from "../hooks/useSingleUser";

const TaskCreatorPrivateRoute = ({ children }) => {
  const { singleUser, isPending } = useSingleUser();

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
  if (role !== "TaskCreator") {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  } else {
    return <div>{children}</div>;
  }
};

export default TaskCreatorPrivateRoute;
