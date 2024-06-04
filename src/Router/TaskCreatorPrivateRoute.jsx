import { Navigate } from "react-router-dom";
import useAllUsers from "../hooks/useAllUsers";
import useAuth from "../hooks/useAuth";
import loaderImg from "../assets/loading.gif";

const TaskCreatorPrivateRoute = ({ children }) => {
  const [users, isPending] = useAllUsers();
  const { user } = useAuth();

  if (isPending) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img src={loaderImg} alt="" />
      </div>
    );
  }

  // current user
  const currentUser = users.find((dbUser) => dbUser?.email === user?.email);
  const role = currentUser?.role;

  // Validation user.
  if (role !== "TaskCreator") {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  } else {
    return <div>{children}</div>;
  }
};

export default TaskCreatorPrivateRoute;
