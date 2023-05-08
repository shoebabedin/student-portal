'use client';
import Login from "../Form/Login";
import Signup from "../Form/Signup";

const { default: Link } = require("next/link");

const Authentication = () => {
  return (
    <>
        <div className="flex md:flex-row flex-col items-center gap-5 justify-center min-h-screen bg-gray-200 text-gray-700">
          <Login/>
          <p>Or</p>
          <Signup/>
        </div>
    
    </>
  );
};

export default Authentication;
