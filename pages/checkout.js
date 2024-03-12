import React, { useState } from "react";
import Cart from "@/components/CheckoutComponents/Cart";
import OrderDetail  from "@/components/CheckoutComponents/OrderDetail";
import { OrderStatus } from "@/components/CheckoutComponents/OrderStatus";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

// export default function checkout(){
//   return(
//     <div>
//       <Cart/>
//       <OrderDetail/>
//     </div>
//   )
// }

export default function checkout() {
  const { cartItems } = useStateContext();

  const [activeStep, setActiveStep] = useState(0);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);

  const steps = [
    { label: "Shopping Cart", component: <Cart /> },
    { label: "Order Detail", component: < OrderDetail /> },
    {
      label: "Order Status",
      component: <OrderStatus orderConfirmed={!paymentFailed} />,
    },
  ];

    const amount = 500;
    const currency = "INR";
    const receiptId = "qwsaq1";
  
    const paymentHandler = async (e) => {
      const response = await fetch("http://localhost:5000/api/rezopay-order", {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const order = await response.json();
      console.log(order);
  
      var options = {
        key: "rzp_test_RYdosVrig791R5", 
        amount,
        currency,
        name: "Acme Corp", 
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, 
        handler: async function (response) {
          const body = {
            ...response,
          };
  
          const validateRes = await fetch(
            "http://localhost:5000/api/rezopay-order/validate",
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const jsonRes = await validateRes.json();
          console.log(jsonRes);
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: "Web Dev Matrix", //your customer's name
          email: "webdevmatrix@example.com",
          contact: "9000000000", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    };

  const router = useRouter();

  const handleStepChange = (index) => {
    if (index === activeStep + 1) {
      if (index === 1 && cartItems.length === 0) {
        toast.error("Your cart is empty. Please add items to proceed.");
        return;
      }
    }
    setActiveStep(index);
  };

  const handlePayNow = () => {
    if (activeStep === 1 && cartItems.length > 0) {
      setPaymentCompleted(true); // Simulating successful payment completion
      setActiveStep(2); // Set the active step to Order Status
    } else {
      setPaymentFailed(true);
      toast.error("Your cart is empty or payment could not be processed.");
      setActiveStep(2); // Set the active step to Order Status even on payment failure
    }
  };

  const handleFailPayment = () => {
    setPaymentFailed(true);
    setActiveStep(2);
  };

 

  return (
    <div className="w-[90%] mx-auto my-[10vh]">
      <div className="flex flex-row justify-between items-center relative my-[10vh] -z-50">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            {index !== 0 && (
              <div className="h-[0.2vh] bg-gray-500 left-[15%] w-[69%] mx-auto absolute -z-50"></div>
            )}
            <div className="flex flex-row items-center px-[2vh] bg-white">
              <p
                className={`text-[2.4vh] flex flex-row  items-center justify-center font-semibold rounded-full ${activeStep > index || (paymentCompleted && index === 2)
                    ? "bg-green-700 text-white"
                    : paymentFailed && index === 2
                      ? "bg-red-500 text-white"
                      : "bg-[#B88E2F] text-white"
                  } w-[5vh] h-[5vh] mr-[1.5vh]`}
              >
                {(activeStep > index || (paymentCompleted && index === 2)) &&
                  !paymentFailed ? (
                  <span>&#10003;</span>
                ) : paymentFailed && index === 2 ? (
                  <span className="flex flex-row justify-center items-center">
                    <FontAwesomeIcon className="text-white text-[3vh]" icon="fa-solid fa-xmark" />
                  </span>
                  // 
                ) : (
                  index + 1
                )}
              </p>
              <h2
                className={`text-[2.8vh] font-medium ${activeStep > index || (paymentCompleted && index === 2)
                    ? "text-green-700"
                    : "bg-white"
                  }`}
              >
                {step.label}
              </h2>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div>{steps[activeStep].component}</div>

      <div className="flex justify-end mt-4">
        {activeStep === 0 && (
          <>
            <button
              onClick={() => handleStepChange(activeStep - 1)}
              disabled={activeStep === 0}
              className="bg-[#B88E2F] text-white px-4 py-2 rounded-md mr-4"
            >
              Back
            </button>
            <button
              onClick={() => handleStepChange(activeStep + 1)}
              disabled={activeStep === steps.length - 1}
              className="bg-[#B88E2F] text-white px-4 py-2 rounded-md"
            >
              Next
            </button>
          </>
        )}
        {activeStep === 1 && (
          <div>
            <button
              onClick={() => handleStepChange(activeStep - 1)}
              disabled={activeStep === 0}
              className="bg-[#B88E2F] text-white px-4 py-2 rounded-md mr-4"
            >
              Back
            </button>
            <button
              onClick={paymentHandler}
              className="bg-[#B88E2F] text-white px-4 py-2 rounded-md mr-4"
            >
              Pay Now!
            </button>
            <Link href="/">
            <button
              className="bg-[#B88E2F] text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
