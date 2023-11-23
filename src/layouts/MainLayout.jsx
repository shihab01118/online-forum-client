import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      {/* TODO: navbar */}
      <Navbar />

      {/* Outlet */}
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default MainLayout;
