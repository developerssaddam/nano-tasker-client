import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import WorkerHome from "../pages/Dashboard/Worker/WorkerHome/WorkerHome";
import TaskCreatorHome from "../pages/Dashboard/TaskCretor/TaskCreatorHome/TaskCreatorHome";
import TaskList from "../pages/Dashboard/Worker/TaskList/TaskList";
import MySubmissions from "../pages/Dashboard/Worker/MySubmissions/MySubmissions";
import AddNewTasks from "../pages/Dashboard/TaskCretor/AddNewTasks/AddNewTasks";
import MyTasks from "../pages/Dashboard/TaskCretor/MyTasks/MyTasks";
import PurchaseCoin from "../pages/Dashboard/TaskCretor/PurchaseCoin/PurchaseCoin";
import PaymentHistory from "../pages/Dashboard/TaskCretor/PaymentHistory/PaymentHistory";
import PrivateRoute from "./PrivateRoute";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageTask from "../pages/Dashboard/Admin/ManageTask/ManageTask";
import Dashboard from "../layout/Dashboard";
import WorkerPrivateRoute from "./WorkerPrivateRoute";
import TaskCreatorPrivateRoute from "./TaskCreatorPrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // User-Routes
      {
        path: "/dashboard/worker",
        element: (
          <WorkerPrivateRoute>
            <WorkerHome />
          </WorkerPrivateRoute>
        ),
      },
      {
        path: "/dashboard/tasklist",
        element: (
          <WorkerPrivateRoute>
            <TaskList />
          </WorkerPrivateRoute>
        ),
      },

      {
        path: "/dashboard/mysubmission",
        element: (
          <WorkerPrivateRoute>
            <MySubmissions />
          </WorkerPrivateRoute>
        ),
      },

      // TaskCreator-Routes
      {
        path: "/dashboard/taskcreator",
        element: (
          <TaskCreatorPrivateRoute>
            <TaskCreatorHome />
          </TaskCreatorPrivateRoute>
        ),
      },
      {
        path: "/dashboard/addnewtask",
        element: (
          <TaskCreatorPrivateRoute>
            <AddNewTasks />
          </TaskCreatorPrivateRoute>
        ),
      },
      {
        path: "/dashboard/mytasks",
        element: (
          <TaskCreatorPrivateRoute>
            <MyTasks />
          </TaskCreatorPrivateRoute>
        ),
      },
      {
        path: "/dashboard/purchasecoin",
        element: (
          <TaskCreatorPrivateRoute>
            <PurchaseCoin />
          </TaskCreatorPrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment/history",
        element: (
          <TaskCreatorPrivateRoute>
            <PaymentHistory />
          </TaskCreatorPrivateRoute>
        ),
      },

      // Admin-Routes
      {
        path: "/dashboard/admin",
        element: (
          <AdminPrivateRoute>
            <AdminHome />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/dashboard/manageusers",
        element: (
          <AdminPrivateRoute>
            <ManageUsers />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/dashboard/managetask",
        element: (
          <AdminPrivateRoute>
            <ManageTask />
          </AdminPrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
