"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = (variant) => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCreateAccount = () => {
    // Simulate login process
    setLoading(true);
    setTimeout(() => {
      // After some time (simulating asynchronous process)
      setLoading(false);
      toast.success("Account Created Successfully!!", {
        position: "bottom-left",
      });
    }, 2000); // Adjust time as per your requirement
  };

  return (
    <div className="mx-[6vh]">
      <h1 className="text-[4vh] mb-[1.5vh] font-semibold text-[#313131]">
        Create Account
      </h1>

      <div>
        <div className="flex flex-row gap-[1vh]">
          <TextField
            id="outlined-basic"
            label="Enter First Name"
            variant="outlined"
            className="w-full my-[1vh]"
          />

          <TextField
            id="outlined-basic"
            label="Enter Last Name"
            variant="outlined"
            className="w-full my-[1vh]"
          />
        </div>

        <div className="flex flex-row gap-[1vh]">
          <TextField
            id="outlined-basic"
            label="Enter Email Address"
            variant="outlined"
            className="w-full my-[1vh]"
          />
        </div>

        <div>
          <FormControl className="w-full my-[1vh]" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Create Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <FormControl className="w-full my-[1vh]" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>

        <button
          className="bg-[#422c12] active:bg-[#291b0b] w-full my-[1vh] h-[7vh] rounded-md"
          onClick={() => handleCreateAccount()}
        >
          {loading ? (
            <CircularProgress
              size={24}
              color="secondary"
              sx={{ color: "#fff" }}
            />
          ) : (
            <p className="text-white text-[2.9vh]">CreateAccount</p>
          )}
        </button>
      </div>

      <h1 className="text-center text-[2.7vh] my-[3vh]">
        Already have an Account?{" "}
        <Link href="/login">
          <span className="font-semibold text-[#422c12]">Log in</span>
        </Link>
      </h1>

      <div className="mt-[5vh]">
        <div className="relative">
          <hr className="h-[0.5vh]" />
          <p className="text-center absolute text-gray-500 font-medium text-[2.6vh] -top-[2vh] left-[42%] bg-white px-[1vh]">
            Sign up with
          </p>
        </div>

        <div className="flex flex-row justify-center items-center gap-x-[2vh] mt-[4vh] bg-orange-100 py-[1vh] rounded-lg shadow-md">
          <img src="/google.png" className="w-[3.7vh] h-[3.7vh]" alt="" />
          <p className="text-[2.7vh] font-semibold text-gray-700">
            Continue with Google
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
