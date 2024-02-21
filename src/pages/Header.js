import { useState, useEffect, useRef } from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiSlideshow3Fill } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
const Header = () => {
  const { currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const [results, setresults] = useState("");
  const navRef = useRef();
  const searchRef = useRef();
  const getYear = date => {
    if (date) {
      var Year = date.split("").slice(0, 4);
      return Year.join("");
    }
  };
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",

        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
      }
    };
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then(res => res.json())
      .then(res => setresults(res.results))
      .catch(err => console.log(err));
  }, [search]);

  return (
    <div className="container mx-auto z-50 px-[15px] md:px-[7px] md:px-0 py-[15px] flex justify-between items-center sticky">
      <div className="space-x-[10px]">
        <NavLink to="/" className="font-bold text-[32px]">
          <span className="bg-primaryRed ">T</span>imv
        </NavLink>
      </div>

      <div
        className="relative flex items-center justify-center w-[350px] h-[45px] hidden md:block searchInput"
        ref={searchRef}
      >
        <input
          className="w-full rounded-[7px] h-full p-0 indent-[37px] text-[16px]
          bg-[#262626] outline-none"
          onChange={e => setSearch(e.target.value)}
          value={search}
        />

        <IoSearch
          className="icon absolute left-[10px] top-[50%] translate-y-[-50%] "
          size="24px"
        />
        <div className="result-container absolute top-[60px] flex flex-col min-w-full max-h-[350px] overflow-y-auto">
          {results &&
            results.map(movie => (
              <NavLink
                key={movie.id}
                to={`/search/${movie.media_type}/${movie.id}`}
                className="result transition-opacity hover:opacity-70 font-medium bg-primary_black text-[22px]"
                onClick={e => setSearch("")}
              >
                <span className="text-[17px]">{movie.name || movie.title}</span>
                <span className="font-extralight opacity-75 mx-[4px] text-[13px]">
                  (
                  {movie.media_type === "person"
                    ? "Person"
                    : getYear(movie.release_date || movie.first_air_date)}
                  )
                </span>
              </NavLink>
            ))}
        </div>
      </div>
      <div className="searchBtn flex items-center space-x-[15px]">
        <IoSearch
          size="26px"
          className="bg-primaryRed rounded-full w-[40px] h-[40px] p-[5px]
          hover:opacity-75 transition-opacity hidden md:block"
          onClick={() => searchRef.current.classList.toggle("open")}
        />
        {currentUser ? (
          <NavLink to="/profile" className="w-[50px] h-[50px] hidden md:block">
            <img
              src={currentUser?.photoURL || "/images/guest.jpg"}
              className="h-full w-full rounded-[50%]"
            />
          </NavLink>
        ) : (
          <NavLink
            to="/sign-in"
            className="bg-primaryRed py-[7.2px] rounded-[3px] md:block w-[60px] min-w-[95px] text-center font-semibold"
          >
            Sign-in
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
