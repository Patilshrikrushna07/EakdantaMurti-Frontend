import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import BackdropLoader from "../elements/BackdropLoader";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

const MyOrders = () => {
  const [ordersWithProductDetails, setOrdersWithProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const userId = sessionStorage.getItem("user_id");
      const token = getCookie("auth_token");
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiUrl}/get-user-order/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const ordersData = data.data;
        const ordersWithProductDetails = await Promise.all(
          ordersData.map(async (order) => {
            const productResponse = await fetch(
              `${apiUrl}/get-product/${order.items[0].product_id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (productResponse.ok) {
              const productData = await productResponse.json();
              return { ...order, product: productData.data }; // Add product details to order
            } else {
              console.error(
                `Failed to fetch product details for order ${order._id}`
              );
              return order;
            }
          })
        );
        setOrdersWithProductDetails(ordersWithProductDetails);
        setIsLoading(false);
        console.log(
          "User Orders details fetched Successfully",
          ordersWithProductDetails
        );
      } else {
        console.log("Failed to fetch orders:", response.status);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const orderDate = new Date(dateString);
    const estimatedDeliveryDate = new Date(orderDate);
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 7); // Add 7 days
    return {
      orderDate: orderDate.toLocaleString(undefined, options),
      estimatedDeliveryDate: estimatedDeliveryDate.toLocaleString(undefined, options),
    };
  };

  return (
    <div>
      {/* <h1 className='text-center text-[4.5vh]'>Order History</h1> */}
      {isLoading ? (
        <div className="h-[50vh] flex flex-col items-center justify-center">
          <CircularProgress size={30} className="text-amber-950" />
        </div>
      ) : // <h1>My Recent Orders</h1>

      ordersWithProductDetails.length > 0 ? (
        ordersWithProductDetails.map((order) => (
          <div className="mb-[10vh] shadow-lg bg-[#fcfaf6] p-[2.5vh]" key={order._id}>
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-[3vh] font-semibold text-amber-950">
                Order ID: <span className="font-normal"> #{order._id}</span>
              </h2>
              <div>
                <button className="text-center px-[2vh] my-[2vh] font-semibold shadow-md hover:scale-110 hover:bg-[#B88E2F] hover:text-white transition-all mx-auto py-[1vh] text-[#B88E2F]  border-[#B88E2F] border-[0.3vh] mr-[2vh]">
                  {" "}
                  Download Invoice
                </button>
                <button className="text-center px-[2vh] my-[2vh] font-semibold shadow-md hover:scale-110 bg-[#B88E2F] hover:bg-white text-white transition-all mx-auto py-[1vh] hover:text-[#B88E2F]  border-[#B88E2F] border-[0.3vh]">
                  {" "}
                  Check Order Status
                </button>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="text-[3vh] font-semibold text-green-800">
                Estimated Delivery:{" "}
                <span className="font-normal">
                  {formatDate(order.order_date).estimatedDeliveryDate}
                </span>{" "}
              </p>
              <p className="text-[3vh] font-semibold text-amber-950">
                Order Date:{" "}
                <span className="font-normal">      {formatDate(order.order_date).orderDate}
                </span>{" "}
              </p>
            </div>

            <p>Status: {order.status}</p>
            <p>Total Amount: {order.total_amount}</p>
            <h3>Product Details:</h3>
            <p>Name: {order.product.name}</p>
            <p>Price: {order.product.price}</p>
            <img
              className="w-[40vh] bg-red-600 p-[1vh]"
              src={order.product.images[0]}
              alt={order.product.name}
            />
            {/* Render other product details as needed */}
          </div>
        ))
      ) : (
        <div className="h-auto ">
          <p className="text-[3.4vh] font-medium text-amber-950 text-center my-[2vh]">
            Your have no Recent Orders!
          </p>
          <Link href="/shop">
            <p className="text-center my-[2vh] font-semibold shadow-md hover:scale-125 hover:bg-[#B88E2F] hover:text-white transition-all mx-auto py-[1vh] text-[#B88E2F]  border-[#B88E2F] border-[0.3vh] w-[35vw] md:w-[15vw]">
              Continue Shopping
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
