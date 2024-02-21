import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiSlideshow3Fill } from "react-icons/ri";
import { useAuth } from "../context/AuthProvider";
const BottomBar = () => {
  const { currentUser } = useAuth();
  const [active, setActive] = useState("home");
  return (
    <div
      className="w-full fixed bottom-0 bg-primary_grey flex flex-row md:hidden
    justify-evenly py-[8px] border-t-[1px] border-t-[#99999954]"
    >
      <NavLink
        to="/home"
        className={`div flex items-center space-y-[1.5px] flex-col   bg-primary_grey
      ${active === "home" && " nav_active"}`}
        onClick={() => setActive("home")}
      >
        <IoHome
          color={active === "home" ? "#ee0000" : "white"}
          size="30px"
          className=" mx-auto"
        />
        <span
          className={`text-[14px] transition-[0.5s] font-bold ${
            active === "home" ? "text-[#ee0000] opacity-100" : "opacity-30"
          }`}
        >
          Home
        </span>
      </NavLink>
      <NavLink
        to="/search"
        className={`div flex items-center  space-y-[1.5px] flex-col   bg-primary_grey
      ${active === "search" && "nav_active"}`}
        onClick={() => setActive("search")}
      >
        <IoSearch
          color={active === "search" ? "#ee0000" : "white"}
          size="30px"
          className=" mx-auto"
        />
        <span
          className={`text-[14px] transition-[0.5s] font-bold  ${
            active === "search" ? "text-[#ee0000] opacity-100" : "opacity-30"
          }`}
        >
          Search
        </span>
      </NavLink>

      <NavLink
        to="/list/favorite "
        className={`div flex items-center  space-y-[1.5px] flex-col   bg-primary_grey
      ${active === "fav" && "nav_active"}`}
        onClick={() => setActive("fav")}
      >
        <FaHeart
          color={active === "fav" ? "#ee0000" : "white"}
          size="30px"
          className=" mx-auto"
        />
        <span
          className={`text-[14px] transition-[0.5s] font-bold ${
            active === "fav" ? "text-[#ee0000] opacity-100" : "opacity-30"
          }`}
        >
          Favorite
        </span>
      </NavLink>
      <NavLink
        to="/list/watch-list"
        className={`div flex items-center  space-y-[1.5px] flex-col   bg-primary_grey
      ${active === "watch" && "nav_active"}`}
        onClick={() => setActive("watch")}
      >
        <RiSlideshow3Fill
          color={active === "watch" ? "#ee0000" : "white"}
          size="30px"
          className=" mx-auto"
        />
        <span
          className={`text-[14px] transition-[0.5s] font-bold ${
            active === "watch" ? "text-[#ee0000] opacity-100" : "opacity-30"
          }`}
        >
          Watchlist
        </span>
      </NavLink>
      {currentUser && (
        <NavLink
          to="/profile"
          className={`div flex items-center  space-y-[1.5px] flex-col   bg-primary_grey
      ${active === "profile" && "nav_active"}`}
          onClick={() => setActive("profile")}
        >
          <IoSettingsSharp
            color={active === "profile" ? "#ee0000" : "white"}
            size="30px"
            className=" mx-auto"
          />
          <span
            className={`text-[14px] transition-[0.5s] font-bold ${
              active === "profile" ? "text-[#ee0000] opacity-100" : "opacity-30"
            }`}
          >
            Profile
          </span>
        </NavLink>
      )}
    </div>
  );
};

export default BottomBar;
