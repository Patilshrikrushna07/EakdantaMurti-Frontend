import React, { useState } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function MakePayment({onPaymentComplete}) {
  const { totalPrice } = useStateContext();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const amount = totalPrice * 100;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    setLoading(true);
  
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiUrl}/rezopay-order`, {
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
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: totalPrice * 100,
        currency: currency,
        name: "Ekdanta Murtis",
        description: "Test Transaction",
        image: "/favicon.ico",
        order_id: order.id,
        handler: async function (response) {
          const body = {
            ...response,
          };
  
          try {
            const validateRes = await fetch(`${apiUrl}/rezopay-order/validate`, {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            });
            
            const jsonRes = await validateRes.json();
            console.log(jsonRes);
          } catch (error) {
            console.error("Error validating payment:", error);
            // Handle error
          } finally {
            onPaymentComplete();
          }
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#B88E2F",
        },
      };
  
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
      e.preventDefault();
    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle error
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };
  
  return (
    <div>
      <button
        className="bg-[#fcfcfc] shadow-xl text-[#141414] font-bold font-poppins w-[25vh] hover:scale-110 transition-all hover:bg-[#141414] hover:text-white py-[1.5vh]"
        onClick={paymentHandler}
      >
        {loading?(
          <div className="flex justify-center items-center text-white">
            <div className="loader">
              <CircularProgress size={24} color="inherit"/>
            </div>
          </div>
        ):(
          <button>
            Pay Now!
          </button>
        )}
      </button>
    </div>
  );
}
