import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, NavLink } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
const Settings = () => {
  const { currentUser, signOut } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const hashEmail = email => {
    const arr = email.split("");
    const indexNumber = arr.indexOf("@");
    arr.splice(indexNumber);
    const number = Math.floor(arr.length / 2);
    arr.splice(number);
    return `${arr.join("")}***@gmail.com`;
  };
  const handelLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      setError(err.status);
      console.log(err.code);
    }
  };
  return (
    <div className="container flex mx-auto items-center justify-center h-[100vh]">
      <div className="bg-primary_grey flex flex-col w-[350px] md:w-[500px] rounded-[8px] p-[20px] space-y-[20px]">
        {error && <p>{error}</p>}
        <div className="flex flex-col ">
          <div className="flex justify-center min-w-full">
            <img
              src={currentUser?.photoURL || "/images/guest.jpg"}
              className="h-[120px] rounded-[50%]"
            />
          </div>
        </div>
        <div className="relative h-[50px]">
          <NavLink
            to="/profile/edit"
            className="absolute right-[10px] bottom-[20px] bg-primaryRed rounded-[16px] px-[13px] py-[5px] flex space-x-[4px] items-center justify-center"
          >
            <FaRegEdit size="20px" />
            <span>Edit</span>
          </NavLink>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 space-y-[5px] min-w-full justify-center items-center">
          <div className="flex flex-col ">
            <p className="text-[22px]">Namee</p>
            <p className="opacity-80 text-[18px]">{currentUser.displayName}</p>
          </div>
          <div className=" ">
            <p className="text-[22px]">Email</p>
            <p className="opacity-80 text-[18px] max-w-[99%] overflow-hidden">
              {hashEmail(currentUser.email)}
            </p>
          </div>
          <div className="flex flex-col ">
            <p className="text-[22px]">Password</p>
            <p className="opacity-80 text-[18px]">Password</p>
          </div>
        </div>

        <button
          className="bg-primaryRed font-semibold w-[120px] py-[7px] rounded-[4px]"
          onClick={handelLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
