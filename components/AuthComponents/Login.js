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
import Link from 'next/link';


const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleClickShowPassword = (variant) =>{
    setShowPassword((show) => !show);
  } 

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    // Simulate login process
    setLoading(true);
    setTimeout(() => {
      // After some time (simulating asynchronous process)
      setLoading(false);
      toast.success("Login Successful",{position:'bottom-left'})
    }, 2000); // Adjust time as per your requirement
  };

  return (
    <div className="m-[6vh]">
      <h1 className="text-[4vh] font-semibold text-[#313131] text-center">
        Login
      </h1>

      <div>
        <TextField
          id="outlined-basic"
          label="Enter Email Address"
          variant="outlined"
          className="w-full my-[2vh]"
        />

        <FormControl className="w-full my-[2vh]" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
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

        <button
          className="bg-[#422c12] active:bg-[#291b0b] w-full h-[7vh] rounded-md"
          onClick={()=>handleLogin()}
        >
          {loading ? (
            <CircularProgress
              size={24}
              color="secondary"
              sx={{ color: "#fff" }}
            />
          ) : (
            <p className="text-white text-[2.9vh]">Login</p>
          )}
        </button>
      </div>

      <h1 className="text-center text-[2.7vh] my-[3vh]">
        Didn't have an Account ?{" "}
        <Link href="/signup">
          <span className="font-semibold text-[#422c12]">Sign Up</span>
        </Link>
      </h1>

      
    </div>
  );
};

export default Login;
