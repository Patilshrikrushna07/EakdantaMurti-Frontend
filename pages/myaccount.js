import React, { useState } from "react";
import MyAccount from "../components/AuthComponents/MyAccount";
import MyOrders from "../components/AuthComponents/MyOrders";
import { useRouter } from "next/router";

const MyAccountPage = () => {
  const [activeBtn, setActiveBtn] = useState("MyAccount");

  const handleBtnClick = (button) => {
    setActiveBtn(button);
  };

  const router = useRouter();

  const handleLogout = () => {
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect to the login page
    router.push("/login");
  };

  return (
    <div>
      <div className="w-[90%] relative my-[6vh] mx-auto flex flex-row justify-between items-center">
        <div className="absolute my-[5vh] flex flex-row border-2 rounded-full border-amber-800">
          <button
            className={`text-[2vh] px-[2vh] py-[1.5vh] rounded-full transition-all ease-in-out ${
              activeBtn === "MyAccount" ? "bg-amber-800 text-white" : ""
            }`}
            onClick={() => handleBtnClick("MyAccount")}
          >
            User Details
          </button>
          <button
            className={`text-[2vh] px-[2vh] py-[1.5vh] rounded-full transition-all ease-in-out ${
              activeBtn === "MyOrders" ? "bg-amber-800 text-white" : ""
            }`}
            onClick={() => handleBtnClick("MyOrders")}
          >
            My Orders
          </button>
        </div>
        <h1 className="text-[3.5vh] font-medium mx-auto">My Account</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 absolute right-0 text-white text-[2.6vh] rounded-xl px-[2vh] py-[1.5vh]"
        >
          Logout
        </button>
      </div>
      <div className="w-[80vw] mx-auto overflow-hidden m-[10vh]">
        {activeBtn === "MyAccount" ? <MyAccount /> : <MyOrders />}
      </div>
    </div>
  );
};

export default MyAccountPage;

export async function getServerSideProps(context) {
  let data = [];
  const { req, locale, defaultLocale } = context;
  const Cookie = req.headers.cookie;
  const { auth_token } = req.cookies;

  if (!auth_token) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      loggedInUser: auth_token ? true : false,
    },
  };
}
