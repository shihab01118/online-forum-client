import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home/Home";
import Membership from "../pages/Membership/Membership";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import AddPost from "../pages/DashBoard/User/AddPost/AddPost";
import MyPosts from "../pages/DashBoard/User/MyPosts/MyPosts";
import UserProfile from "../pages/DashBoard/User/UserProfile/UserProfile";
import AdminProfile from "../pages/DashBoard/Admin/AdminProfile/AdminProfile";
import ManageUsers from "../pages/DashBoard/Admin/ManageUsers/ManageUsers";
import Announcement from "../pages/DashBoard/Admin/Announcement/Announcement";
import Activities from "../pages/DashBoard/Admin/Activities/Activities";

export const router = createBrowserRouter([
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
        path: "membership",
        element: (
          <PrivateRoute>
            <Membership />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      // user routes
      {
        path: "userProfile",
        element: <UserProfile />,
      },
      {
        path: "addPost",
        element: <AddPost />,
      },
      {
        path: "myPosts",
        element: <MyPosts />,
      },

      // admin routes
      {
        path: "adminProfile",
        element: <AdminProfile />,
      },
      {
        path: "manageUsers",
        element: <ManageUsers />,
      },
      {
        path: "makeAnnouncement",
        element: <Announcement />,
      },
      {
        path: "activities",
        element: <Activities />,
      },
    ],
  },
]);
