import { useState, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthProvider";
const Edit = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { currentUser, editName, editEmail, editPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const configPasswordRef = useRef();
  const handelEdit = async e => {
    e.preventDefault();
    setError("");
    setMessage("");
    const promise = [];
    if (
      currentUser.displayName !== nameRef.current.value &&
      nameRef.current.value !== ""
    ) {
      promise.push(editName(nameRef.current.value));
    }

    if (
      currentUser.email !== emailRef.current.value &&
      emailRef.current.value !== ""
    ) {
      promise.push(editEmail(emailRef.current.value));
    }
    if (passwordRef.current.value.length >=6) {
      promise.push(editPassword(passwordRef.current.value));
    }
    Promise.all(promise)
      .then(() => {
        setMessage("Succsess Edit");
        console.log("currentUser", JSON.stringify(currentUser, null, 2));
      })
      .catch(err => {
        setError(err.code);
        console.log("currentUser", JSON.stringify(currentUser, null, 2));
        console.log("err", JSON.stringify(err, null, 2));
      });
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[100vh]">
      <form
        className="container w-[340px] md:w-[600px] mx-auto flex flex-col bg-primary_grey py-[20px] px-[10px] rounded-[12px] space-y-[15px]"
        onSubmit={handelEdit}
      >
        <div>
          <p className="text-[32px] font-semibold">Edit Profile</p>
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
        <div className="gap-y-[10px] md:gap-[10px] grid grid-cols-1 items-center justify-center md:grid-cols-2">
          <div className="space-y-[5px]">
            <p>Nameee</p>
            <input
              type="text"
              className="form-input w-full py-[7px] border-[rgb(101,101,101)] border-[2px] outline-0 bg-transparent indent-[5px] rounded-[4px]"
              ref={nameRef}
            />
          </div>
          <div className="space-y-[5px]">
            <p>Email</p>
            <input
              type="email"
              className="form-input w-full py-[7px] border-[rgb(101,101,101)] border-[2px] outline-0 bg-transparent indent-[5px] rounded-[4px]"
              ref={emailRef}
            />
          </div>
          <div className="space-y-[5px]">
            <p>Password</p>
            <input
              type="password"
              className="form-input w-full py-[7px] border-[rgb(101,101,101)] border-[2px] outline-0 bg-transparent indent-[5px] rounded-[4px]"
              ref={passwordRef}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primaryRed py-[8px] font-bold text-[18px] rounded-[4px]"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default Edit;
