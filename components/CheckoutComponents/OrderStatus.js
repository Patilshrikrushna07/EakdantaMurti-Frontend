import React from "react";

export const OrderStatus = () => {
  const steps = [
    { label: "Shopping Cart" },
    { label: "Order Detail" },
    { label: "Order Status" },
  ];

  return (
    <div className="">
      <div className="w-[90%] mx-auto my-[10vh]">
        <div className="flex flex-row justify-between items-center relative my-[10vh] -z-50">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {index !== 0 && (
                <div className="h-[0.2vh] bg-gray-500 left-[15%] w-[69%] mx-auto absolute -z-50"></div>
              )}
              <div className="flex flex-row items-center px-[2vh] bg-white">
                <div
                  className={`text-[2.4vh] flex flex-row items-center justify-center font-semibold rounded-full bg-green-700 text-white w-[5vh] h-[5vh] mr-[1.5vh]`}
                >
                  <span>&#10003;</span>
                </div>
                <h2 className={`text-[2.8vh] font-medium text-green-700`}>
                  {step.label}
                </h2>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-green-600 rounded-[3vh] w-[40%] h-[40vh] p-[2.5vh] mx-auto">
        <h1 className="text-[4.5vh] font-bold text-white my-[3vh] text-center">
          Thank You for Order
        </h1>
        <p className="text-white text-[2.8vh] text-center">
          Your Order Confirmation is sent to your registered email address
        </p>
        <p className="text-white text-[2.8vh] mt-[5vh] text-center">
          Thank You, Do visit Again
        </p>
      </div>
    </div>
  );
};
