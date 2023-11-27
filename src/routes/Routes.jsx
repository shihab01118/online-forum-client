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
import PostDetails from "../pages/Home/Posts/PostDetails";
import AdminRoute from "./AdminRoute";

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
        path: "/posts/:id",
        element: (
          <PrivateRoute>
            <PostDetails />
          </PrivateRoute>
        ),
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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
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
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "makeAnnouncement",
        element: (
          <AdminRoute>
            <Announcement />
          </AdminRoute>
        ),
      },
      {
        path: "activities",
        element: (
          <AdminRoute>
            <Activities />
          </AdminRoute>
        ),
      },
    ],
  },
]);
