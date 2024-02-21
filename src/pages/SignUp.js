import { useState, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthProvider";
const SignUp = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const emailRef = useRef();
  const passwordRef = useRef();
  const configPasswordRef = useRef();
  const handelSignUp = async e => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (passwordRef.current.value !== configPasswordRef.current.value) {
      return setError("Passwords Aren't match");
    }
    if (passwordRef.current.value.length < 6) {
      return setError("Password length shouldn't be less then 6");
    }
    try {
      await signUp(emailRef.current.value, passwordRef.current.value);

      setMessage("Success Sign-up");
      setTimeout(() => {
        navigate(location.state?.path || "/", { replace: true });
      }, 2000);
    } catch (err) {
      setError(() => {
        if (err.code === "auth/email-already-in-use") {
          return "Email had alrady used";
        }
      });

      console.log("firrbase " + err);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[100vh]">
      <form
        className="container w-[330px] md:w-[400px] mx-auto flex flex-col bg-primary_grey py-[20px] px-[10px] rounded-[12px] space-y-[15px]"
        onSubmit={handelSignUp}
      >
        <div>
          <p className="text-[32px] font-semibold">Sign-up</p>
          <p className="font-normal opacity-70">
            contiune to use More Feature !
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
        <div className="space-y-[10px] flex flex-col">
          <div className="space-y-[5px]">
            <p>Email</p>
            <input
              type="email"
              className="form-input w-full py-[7px] border-[rgb(101,101,101)] border-[2px] outline-0 bg-transparent indent-[5px] rounded-[4px]"
              required
              ref={emailRef}
            />
          </div>
          <div className="space-y-[5px]">
            <p>Password</p>
            <input
              type="password"
              className="form-input w-full py-[7px] border-[rgb(101,101,101)] border-[2px] outline-0 bg-transparent indent-[5px] rounded-[4px]"
              required
              ref={passwordRef}
            />
          </div>
          <div className="space-y-[5px]">
            <p>Configure Password</p>
            <input
              type="password"
              className="form-input w-full py-[7px] border-[rgb(101,101,101)] border-[2px] outline-0 bg-transparent indent-[5px] rounded-[4px]"
              required
              ref={configPasswordRef}
            />
          </div>

          <button
            type="submit"
            className="bg-primaryRed py-[8px] font-bold text-[18px] rounded-[4px]"
          >
            Sign-in
          </button>

          <NavLink
            to="/sign-in"
            className="font-semibold opacity-80 text-[14px] text-center underline"
          >
            Alrady have an Account ? Sign-in
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
