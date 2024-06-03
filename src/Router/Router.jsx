import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import UserDashboard from "../layout/UserDashboard";
import WorkerHome from "../pages/Dashboard/Worker/WorkerHome/WorkerHome";
import TaskCreatorHome from "../pages/Dashboard/TaskCretor/TaskCreatorHome/TaskCreatorHome";

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
    element: <UserDashboard />,
    children: [
      {
        path: "/dashboard/user",
        element: <WorkerHome />,
      },

      {
        path: "/dashboard/taskcreator",
        element: <TaskCreatorHome />,
      },
    ],
  },
]);

export default router;
