import React, { useEffect } from "react";
import { OrderStatus } from "../components/CheckoutComponents/OrderStatus";
import { useRouter } from "next/router";

const OrderStatusDetails = () => {
  const router = useRouter();
//   const [paymentStatus, setPaymentStatus] = useState(null);

//   useEffect(() => {
//     const validatePayment = async () => {
//       try {
//         const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//         const validateRes = await fetch(`${apiUrl}/rezopay-order/validate`, {
//           method: "POST",
//           body: JSON.stringify(body),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const data = await validateRes.json();
//         if(data.success){
//             setPaymentStatus("success");
//         }else{
//             setPaymentStatus("failure");
//         }
//       } catch (error) {
//         console.error("Error validating payment", error);
//         setPaymentStatus("failure");
//       }
//     };
//     validatePayment();
//   },[]);

//   if(paymentStatus === null){
//     router.push('/');
//     return null;
//   }

  

  return (
    <div>
      <OrderStatus />
    </div>
  );
};

export default OrderStatusDetails;
