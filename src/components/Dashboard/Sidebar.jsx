import { GrLogout } from "react-icons/gr";
import { FaUser, FaList, FaHome, FaUsers } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { TbActivity } from "react-icons/tb";
import { GrAnnounce } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import MenuItem from "./MenuItem";
import Logo from "../shared/Logo";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useAdmin from "../../hooks/useAdmin";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const { logOut } = useAuth();
  const { isAdmin } = useAdmin();

  const handleToggle = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Logo />
          </div>
        </div>

        <button onClick={handleToggle} className="p-4">
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#b8f3ff] w-72 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform 
        ${isActive && "-translate-x-full"}
        md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex py-2 rounded-lg justify-center items-center mx-auto">
              <Logo />
            </div>
          </div>
          <hr className="my-3" />
          <div className="flex flex-col justify-between flex-1">
            <nav>
              {isAdmin ? (
                <>
                  <MenuItem
                    icon={FaUser}
                    label="Profile"
                    address="/dashboard/adminProfile"
                  />
                  <MenuItem
                    icon={FaUsers}
                    label="Manage Users"
                    address="/dashboard/manageUsers"
                  />
                  <MenuItem
                    icon={TbActivity}
                    label="Activities"
                    address="/dashboard/activities"
                  />
                  <MenuItem
                    icon={GrAnnounce}
                    label="Make Announcement"
                    address="/dashboard/makeAnnouncement"
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    icon={FaUser}
                    label="My Profile"
                    address="/dashboard/userProfile"
                  />
                  <MenuItem
                    icon={MdPostAdd}
                    label="Add Post"
                    address="/dashboard/addPost"
                  />
                  <MenuItem
                    icon={FaList}
                    label="My Posts"
                    address="/dashboard/myPosts"
                  />
                </>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr className="mb-3" />

          <MenuItem icon={FaHome} label="Home" address="/" />
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
