import React, { useState } from "react";
import SignUp from "../components/AuthComponents/SignUp";
import AuthBg from "../components/AuthComponents/AuthBg";
import MobileVerification from "../components/AuthComponents/MobileVerification";

const SignUpPage = () => {

  const [mobileVerificationDone, setMobileVerificationDone] = useState(false);

  const handleVerification = () => {
    setMobileVerificationDone(true);
  };

  return (
    <div className="flex flex-row items-center overflow-y-hidden">
      <div className="w-[50%]">
        {mobileVerificationDone ? (
          <SignUp/>
        ):(
          <MobileVerification onComplete={handleVerification}/>
        )}
      </div>
      <AuthBg />
    </div>
  );
};

export default SignUpPage;
