import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden pt-[3px]">
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <AiOutlineMenu size={22} />
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:max-w-[15vw] bg-white overflow-hidden left-4 top-14 text-sm border border-[#1E88E5]">
          <div className="flex flex-col cursor-pointer">
            <NavLink
              to="/"
              className="px-4 py-2 hover:bg-base-100 transition font-semibold"
            >
              Home
            </NavLink>
            <hr />
            <NavLink
              to="/membership"
              className="px-4 py-2 hover:bg-base-100 transition font-semibold"
            >
              Membership
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
export default MenuDropdown;
