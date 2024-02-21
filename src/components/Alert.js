import React from "react";

const Alert = () => {
  return setTimeout(
    () => (
      <div className="w-[100%] h-[100vh] flex items-center justify-center absolute top-10 left-[50%] translate-x-[-50%] z-50">
        <div className="mx-auto w-[330px] md:w-[360px] bg-green-600 py-[20px]">
          <div>Success Add !</div>
        </div>
      </div>
    ),
    4000
  );
};

export default Alert;
