"use client";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };


  return (
    <div className="m-[6vh]">
      <h1 className="text-[4vh] font-semibold text-[#313131] text-center">Login</h1>

      <div>
        <input
          type="text"
          placeholder="Enter Email Address"
          className="p-[1.5vh] text-[2.3vh] w-full my-[3vh] placeholder-[#462E13] rounded-md  text-[#462E13] border-2 border-[#462E13] focus:outline-none"
        />

        <div className="p-[1.5vh] flex flex-row justify-between items-center text-[2.3vh] w-full mb-[3vh] placeholder-[#462E13] rounded-md text-[#462E13] border-2 border-[#462E13] focus:outline-none">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            className="placeholder-[#462E13] bg-transparent w-full focus:outline-none"
          />
          <button className="" onClick={togglePasswordVisibility}>
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
        </div>

        <button className="bg-[#462E13] w-full p-[1.5vh] rounded-md">
            <p className="text-white text-[2.4vh]">Login</p>
        </button>
        

      </div>
    </div>
  );
};

export default Login;
