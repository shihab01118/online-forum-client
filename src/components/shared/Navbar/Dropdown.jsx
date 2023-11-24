import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import avatarImg from "../../../assets/images/placeholder.jpg";
import { Button } from "@mui/material";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full cursor-pointer border-[1px] border-neutral-200 hover:shadow-lg transition"
      >
        <div>
          {/* Avatar */}
          <img
            className="rounded-full"
            referrerPolicy="no-referrer"
            src={user && user.photoURL ? user.photoURL : avatarImg}
            alt="profile"
            height="32"
            width="32"
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:max-w-[15vw] bg-white overflow-hidden right-0 top-12 text-sm border border-[#1E88E5]">
          <div className="flex flex-col">
            <p className="px-4 py-2 hover:bg-base-100 transition font-semibold">
              {user ? user?.displayName : "shahed al amin shihab"}
            </p>
            <hr />
            <Link
              to="/dashboard"
              className="px-4 py-2 hover:bg-base-100 transition font-semibold"
            >
              Dashboard
            </Link>
            <hr />

            <div className="px-4 py-2">
              <Button
                onClick={logOut}
                disableElevation
                fullWidth
                variant="contained"
              >
                Log out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
