import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const handelForgotPassword = async e => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await resetPassword(emailRef.current.value);

      setMessage("Succesfully Sign in");
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    } catch (err) {
      setError("Something went wrong");
    }
  };
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[100vh]">
      <form
        className="container w-[330px] md:w-[400px] mx-auto flex flex-col bg-primary_grey py-[20px] px-[10px] rounded-[12px] space-y-[15px]"
        onSubmit={handelForgotPassword}
      >
        <div>
          <p className="text-[32px] font-semibold">Reset Password</p>
          <p className="font-normal opacity-70">
            continue To get a reset Message !
          </p>
        </div>
        {error && (
          <div className="bg-primaryRed py-[10px] text-[14px] font-bold px-[10px] rounded-[4px]">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-[rgba(32,255,69,0.576)] py-[10px] text-[14px] font-bold px-[10px] rounded-[4px]">
            {message}
          </div>
        )}
        <div className="space-y-[14px] flex flex-col">
          <div className="space-y-[5px]">
            <p>Email</p>
            <input
              type="email"
              className="form-input w-full py-[7px] border-[rgb(101,101,101)] border-[2px] outline-0 bg-transparent indent-[5px] rounded-[4px]"
              required
              ref={emailRef}
            />
          </div>

          <button
            type="submit"
            className="bg-primaryRed py-[8px] font-bold text-[18px] rounded-[4px]"
          >
            Send
          </button>

          <NavLink
            to="/sign-in"
            className="font-semibold opacity-80 text-[18px] text-center underline"
          >
            {"<"} Back
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
