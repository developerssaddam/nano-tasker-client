import { NavLink } from "react-router-dom";
import "./DashboardMenu.css";
import useSingleUser from "../../../hooks/useSingleUser";

const DashboardMenu = () => {
  const { singleUser, isPending } = useSingleUser();
  if (isPending) {
    return "Loading";
  }
  // get current user role.
  const role = singleUser?.role;

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

            <NavLink to="/dashboard/widrow/coin">
              <li>WithDraw Coin</li>
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
