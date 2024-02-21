import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiSlideshow3Fill } from "react-icons/ri";
import { useAuth } from "../context/AuthProvider";
const SideBar = () => {
  const { currentUser } = useAuth();
  const barRef = useRef();
  return (
    <div
      className="hidden md:block sidebar overflow-x-hidden overflow-y-scroll bg-primary_grey"
      ref={barRef}
    >
      <div className=" hidden md:flex flex-col fixed items-start  h-[80%] px-[10px] bg-red overflow-x-hidden overflow-y-scroll ">
        <div className="relative w-[50px] h-[30px] my-[20px]">
          <FaArrowRight
            size="37px"
            color="#E50000"
            className="icon"
            onClick={() => barRef.current.classList.toggle("open")}
          />
        </div>
        <div className="side-nav flex-col justify-start space-y-[20px] overflow-x-hidden ">
          <NavLink to="/home" className="flex items-center space-x-[5px]">
            <IoHome color="#E50000" size="37px" />
            <span className="font-bold text-[20px]">Home</span>
          </NavLink>
          <NavLink to="/search" className="flex items-center space-x-[5px]">
            <IoSearch color="#E50000" size="37px" />
            <span className="font-bold text-[20px]">Search</span>
          </NavLink>
          <NavLink
            to="/list/favorite"
            className="flex items-center space-x-[5px]"
          >
            <FaHeart color="#E50000" size="37px" />
            <span className="font-bold text-[20px]">Favorite</span>
          </NavLink>
          <NavLink
            to="/list/watch-list"
            className="flex items-center space-x-[5px]"
          >
            <RiSlideshow3Fill color="#E50000" size="37px" />
            <span className="font-bold text-[20px]">Watch List</span>
          </NavLink>
          {currentUser ? (
            <NavLink to="/profile" className="flex items-center space-x-[5px]">
              <IoSettingsSharp color="#E50000" size="37px" />
              <span className="font-bold text-[20px]">Profile</span>
            </NavLink>
          ) : (
            <NavLink
              to="/sign-in"
              className="login-btn absolute bottom-[10px] left-[50%] py-[7px] rounded-[4px] translate-x-[-50%] bg-primaryRed w-[80%] font-semibold text-center"
            >
              Sign-in
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
