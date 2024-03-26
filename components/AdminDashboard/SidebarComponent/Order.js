import { useState } from "react";

export const Order = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const [selectedStatus, setSelectedStatus] = useState('Delivered');

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  }

  const recentOrders = [
    {
      id: 451,
      customer: "John Doe",
      total: 100,
      date: "2024-03-10",
      userName: "john_doe",
      quantity: 5,
      products: [
        {
          id: 1,
          name: "Product 1",
          price: 10,
          quantity: 2,
          image: "/sale1.jpg",
        },
        {
          id: 2,
          name: "Product 2",
          price: 20,
          quantity: 3,
          image: "/sale2.jpg",
        },
        // Add more products as needed
      ],
    },
    // Add more orders here
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => (
            <tr key={order.id}>
              <td className="border px-4 py-2  text-center">{order.id}</td>
              <td className="border px-4 py-2  text-center">
                {order.customer}
              </td>
              <td className="border px-4 py-2  text-center">{order.total}</td>
              <td className="border px-4 py-2  text-center">{order.date}</td>
              <td className="border px-4 py-2  text-center !bg-none">
                <select id="status" className="!bg-white" value={selectedStatus} onChange={handleStatusChange}>
                  <option value="Delivered" >Delivered</option>
                  <option value="Progress">In Progress</option>
                  <option value="Dispatched">Dispatched</option>
                </select>
              </td>
              <td className="border px-4 py-2  text-center">
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
                  <td>{selectedStatus}
                  </td>
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
                {selectedOrder.products.map((product) => (
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
