import React,{useState, useEffect} from 'react';
import { getCookie } from "cookies-next";

const MyOrders = () => {

  const [ordersWithProductDetails, setOrdersWithProductDetails] = useState([]);

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
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const ordersData = data.data;
        const ordersWithProductDetails = await Promise.all(ordersData.map(async (order) => {
          const productResponse = await fetch(`${apiUrl}/get-product/${order.items[0].product_id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (productResponse.ok) {
            const productData = await productResponse.json();
            return { ...order, product: productData.data }; // Add product details to order
          } else {
            console.error(`Failed to fetch product details for order ${order._id}`);
            return order;
          }
        }));
        setOrdersWithProductDetails(ordersWithProductDetails);
        console.log("User Orders details fetched Successfully", ordersWithProductDetails);
      } else {
        console.log("Failed to fetch orders:", response.status);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  }

  return (
    <div>
      <h1 className='text-center text-[4.5vh]'>Order History</h1>
      {ordersWithProductDetails.map(order => (
          <div key={order._id}>
            <h2>Order ID: {order._id}</h2>
            <p>Order Date: {order.order_date}</p>
            <p>Status: {order.status}</p>
            <p>Total Amount: {order.total_amount}</p>
            <h3>Product Details:</h3>
            <p>Name: {order.product.name}</p>
            <p>Price: {order.product.price}</p>
            <img className='w-[40vh] bg-red-600 p-[1vh]' src={order.product.images[0]}/>
            {/* Render other product details as needed */}
          </div>
        ))}
    </div>
  )
}

export default MyOrders;