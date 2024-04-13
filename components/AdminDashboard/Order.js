import { useState } from "react";
import { getCookie, getCookies, setCookie } from "cookies-next";

export const Order = ({ summary }) => {
  const token = getCookie("auth_token");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const [selectedStatus, setSelectedStatus] = useState("Delivered");

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // const OrderSummary = async () => {
  //   try {
  //     const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  //     const response = await fetch(`${apiUrl}/get-all-orders`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const summary = await response.json();
  console.log("Order Details fetched successfully", summary);
  //   } catch (error) {
  //     console.error("Error fetching product details:", error);
  //   }
  // };
  // const summaryArray = summary ? summary.data : [];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {/* <button onClick={OrderSummary}>Get order api</button> */}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {summary.data && summary.data.map((order) => (
            <tr key={order._id}>
              <td className="border px-4 py-2 text-center">{order._id}</td>
              <td className="border px-4 py-2 text-center">{order.user_id}</td>
              <td className="border px-4 py-2 text-center">{order.order_date}</td>
              <td className="border px-4 py-2 text-center">{order.total_amount}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleOrderClick(order)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOrder && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <table className="w-full mb-4">
              <tbody>
                <tr>
                  <td className="font-semibold">Order ID:</td>
                  <td>{selectedOrder.id}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Customer:</td>
                  <td>{selectedOrder.customer}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Total:</td>
                  <td>${selectedOrder.total}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Date:</td>
                  <td>{selectedOrder.date}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Status:</td>
                  <td>{selectedStatus}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Quantity:</td>
                  <td>{selectedOrder.quantity}</td>
                </tr>
              </tbody>
            </table>
            <h3 className="text-lg font-semibold mt-4">Products:</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Product Name</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Image</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder?.products?.map((product) => (
                  <tr key={product.id}>
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">${product.price}</td>
                    <td className="border px-4 py-2">{product.quantity}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 inline-block mr-2"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={closeModal}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
