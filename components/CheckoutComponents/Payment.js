import React, { useState } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function MakePayment() {
  const { totalPrice } = useStateContext();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const amount = totalPrice * 100;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    setLoading(true);

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

        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const validateRes = await fetch(`${apiUrl}/rezopay-order/validate`,
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
        router.push("/order-status");
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#B88E2F",
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

  return (
    <div>
      <button
        className="bg-[#B88E2F] rounded-md p-[1.5vh] text-white"
        onClick={paymentHandler}
      >
        {loading?(
          <div className="flex justify-center items-center text-white">
            <div className="loader">
              <CircularProgress size={24} color="inherit"/>
            </div>
          </div>
        ):(
          <div>
            Pay Now!
          </div>
        )}
      </button>
    </div>
  );
}
