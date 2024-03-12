import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";

export default function OrderDetail() {
  const { totalPrice } = useStateContext();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  return (
    <div>
      <h1 className="text-[4vh] font-semibold my-[4vh] text-center">
        Order Details
      </h1>
      <div>
        <h2 className="text-[3vh] my-[2vh]">Personal Details</h2>
        <div className="p-[1vh] border-2 my-[1vh]">
          <input
            type="text"
            name=""
            className="focus:outline-none w-full"
            value={firstName}
            placeholder="Enter Your First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="p-[1vh] border-2 my-[1vh]">
          <input
            type="text"
            name=""
            className="focus:outline-none w-full"
            value={lastName}
            placeholder="Enter Your Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="p-[1vh] border-2 my-[1vh]">
          <input
            type="number"
            name=""
            className="focus:outline-none w-full"
            placeholder="Enter Your Mobile Number"
          />
        </div>

        <div className="p-[1vh] border-2 my-[1vh]">
          <input
            type="email"
            name=""
            className="focus:outline-none w-full"
            // value={session?.user.email || ""}
            placeholder="Enter Your Email Id"
          />
        </div>

        <h2 className="text-[3vh] my-[2vh]">Billing Address</h2>
        <div className="p-[1vh] border-2 my-[1vh]">
          <input
            type="text"
            name=""
            className="focus:outline-none w-full"
            placeholder="Flat No./ Apartment Name, Street Address"
          />
        </div>
        <div className="p-[1vh] border-2 my-[1vh]">
          <input
            type="number"
            name=""
            className="focus:outline-none w-full"
            placeholder="Zip Code"
          />
        </div>
        <div className="p-[1vh] border-2 my-[1vh]">
          <input
            type="text"
            name=""
            className="focus:outline-none w-full"
            placeholder="City Name"
          />
        </div>
        <div className="p-[1vh] border-2 my-[1vh]">
          <input
            type="text"
            name=""
            className="focus:outline-none w-full"
            placeholder="State"
          />
        </div>
        <div className="p-[1vh] border-2 my-[1vh]">
          <input
            type="text"
            name=""
            className="focus:outline-none w-full"
            placeholder="Country"
          />
        </div>
      </div>

      <p className="text-xl font-semibold text-right">
        Total Price: Rs.{totalPrice}
      </p>

    </div>
  );
}
