import { NavLink } from "react-router-dom";
import "./DashboardMenu.css";
import useAuth from "../../../hooks/useAuth";
import useAllUsers from "../../../hooks/useAllUsers";

const DashboardMenu = () => {
  const { user } = useAuth();
  const [users, isPending] = useAllUsers();

  if (isPending) {
    return "Loading";
  }

  const currentUser = users.find((dbUser) => dbUser?.email === user?.email);
  const role = currentUser?.role;

  return (
    <div id="dashboard_menu">
      <ul>
        {role === "Worker" ? (
          <>
            <NavLink to="/dashboard/worker">
              <li>Home</li>
            </NavLink>

            <NavLink to="/dashboard/tasklist">
              <li>TaskList</li>
            </NavLink>

            <NavLink to="/dashboard/mysubmission">
              <li>My Submissions</li>
            </NavLink>
          </>
        ) : role === "TaskCreator" ? (
          <>
            <NavLink to="/dashboard/taskcreator">
              <li>Home</li>
            </NavLink>

            <NavLink to="/dashboard/addnewtask">
              <li>AddNewTasks</li>
            </NavLink>

            <NavLink to="/dashboard/mytasks">
              <li>My Task’s</li>
            </NavLink>

            <NavLink to="/dashboard/purchasecoin">
              <li>Purchase Coin</li>
            </NavLink>

            <NavLink to="/dashboard/payment/history">
              <li>Payment History</li>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/dashboard/admin">
              <li>Home</li>
            </NavLink>

            <NavLink to="/dashboard/manageusers">
              <li>Manage Users</li>
            </NavLink>

            <NavLink to="/dashboard/managetask">
              <li>Manage Task</li>
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
};

export default DashboardMenu;
