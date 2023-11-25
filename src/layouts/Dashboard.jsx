import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar />
      <div className="md:ml-72 flex-1">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
