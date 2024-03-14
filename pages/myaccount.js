import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const myaccount = () => {
  const [formData, setFormData] = useState({
    first_name: "Reena",
    last_name: "",
    email: "",
    mobile_number: "",
    city: "",
    country: "",
    address: "",
    state: "",
    pincode: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="   w-[80vw] mx-auto overflow-hidden m-[10vh]">
      <div className="flex md:flex-row flex-col md:space-x-10 space-y-3">
        <div className="relative md:w-[60vw]">
          <img src="/product1.png" alt="idol-image" className="" />
          <div className="md:w-[20vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:text-[5vh] shadow-2xl text-center bg-[#0000001b] shadow-black font-bold text-white ">
            My Account
          </div>
        </div>
        <form
          className="flex flex-col w-full mx-auto "
          // onSubmit={handleSubmit}
          data-aos="fade-right"
        >
          <div className="flex flex-col w-full space-y-5  justify-between">
            <div>
              <h1 className="text-[3vh] text-[#202020] font-medium">
                Personal Detail
              </h1>
              <div className="flex flex-col md:flex-row justify-between">
                <TextField
                  id="standard-basic"
                  label="FirstName"
                  variant="standard"
                  margin="normal"
                  name="first_name"
                  type="text"
                  className="md:w-[48%] w-full "
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <TextField
                  id="standard-basic"
                  label="LastName"
                  variant="standard"
                  margin="normal"
                  name="name"
                  type="text"
                  className="md:w-[48%] w-full"
                  value={formData.last_namet_name}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between">
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  margin="normal"
                  name="email"
                  type="email"
                  className="md:w-[48%] w-full"
                  value={formData.email}
                  onChange={handleChange}
                />

                <TextField
                  id="standard-basic"
                  label="Phone No."
                  variant="standard"
                  margin="normal"
                  name="phoneNumber"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  className="md:w-[48%] w-full "
                />
              </div>
            </div>
            <div>
              <h1 className="text-[3vh] text-[#202020] font-medium mt-[2vh]">
                Billing Detail
              </h1>
              <div className="flex flex-col md:flex-row justify-between">
                <TextField
                  id="standard-basic"
                  label="Address "
                  variant="standard"
                  margin="normal"
                  name="address"
                  type="text"
                  className=" w-full "
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between">
                <TextField
                  id="standard-basic"
                  label="City"
                  variant="standard"
                  margin="normal"
                  name="city"
                  type="city"
                  className="md:w-[48%] w-full"
                  value={formData.city}
                  onChange={handleChange}
                />

                <TextField
                  id="standard-basic"
                  label="State"
                  variant="standard"
                  margin="normal"
                  name="state"
                  pattern="text"
                  value={formData.state}
                  onChange={handleChange}
                  className="md:w-[48%] w-full "
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between">
                <TextField
                  id="standard-basic"
                  label="Country"
                  variant="standard"
                  margin="normal"
                  name="country"
                  type="text"
                  className="md:w-[48%] w-full"
                  value={formData.country}
                  onChange={handleChange}
                />

                <TextField
                  id="standard-basic"
                  label="Pin Code"
                  variant="standard"
                  margin="normal"
                  name="pincode"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="md:w-[48%] w-full "
                />
              </div>
            </div>
            <button className="text-center px-[8vh] rounded-sm font-semibold shadow-md hover:scale-125 transition-all hover:bg-[#B88E2F] hover:text-[#f5f4f4] w-fit py-[1vh] text-[#B88E2F]  border-[#B88E2F] border-[0.3vh] ">
              SAVE!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default myaccount;
