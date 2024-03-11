import React from "react";
import Link from "next/link";
import { Order } from './Order';


export const Dashboard = () => {
  const recentOrders = [
    { id: 451, customer: 'John Doe', total: 100, date: '2024-03-10', status: 'Delivered', userName: 'john_doe' ,quantity: 10  },
    { id: 258, customer: 'Jane Smith', total: 150, date: '2024-03-09', status: 'Pending', userName: 'jane_smith'  ,quantity: 1},
    { id: 379, customer: 'Alice Johnson', total: 80, date: '2024-03-08', status: 'Cancelled', userName: 'alice_johnson' ,quantity: 3 },
  ];
  return (
    <div className="container mx-auto mt-[2vh] ">
      <h1 className="text-2xl font-bold mb-4">Welcome Back, Reena!</h1>
      <p className="text-gray-600">
        Here's what's happening with your store today.
      </p>

      <div className="flex flex-row space-x-7 my-[3vh]">
        <div className="bg-[#fee6e6db] shadow-md px-[3vh] py-[2vh] rounded-2xl ">
          <h1 className=" text-[2.5vh] ">Ecommerce Revenue</h1>
          <p className="font-semibold text-[4vh]">Rs. 15,58,123</p>
          <div>
            <p className="bg-[#fff] text-red-600 rounded-xl font-semibold mt-[2vh] w-[11vw] text-center px-[1vh]">
              -4.9 %
            </p>
          </div>
        </div>
        <div className="bg-[#e6fee8db] shadow-md px-[3vh] py-[2vh] rounded-2xl ">
          <h1 className=" text-[2.5vh] ">New Customers</h1>
          <p className="font-semibold text-[4vh]">58,123</p>
          <div>
            <p className="bg-[#fff] text-green-600 rounded-xl font-semibold mt-[2vh] w-[11vw] text-center px-[1vh]">
              +14.9 %
            </p>
          </div>
        </div>
        <div className="bg-[#e6fcfedb] shadow-md px-[3vh] py-[2vh] rounded-2xl ">
          <h1 className=" text-[2.5vh] ">Total Order</h1>
          <p className="font-semibold text-[4vh]">123</p>
          <div>
            <p className="bg-[#fff] text-green-600 rounded-xl font-semibold mt-[2vh] w-[11vw] text-center px-[1vh]">
              +14.9 %
            </p>
          </div>
        </div>
        <div className="bg-[#e6e8fedb] shadow-md px-[3vh] py-[2vh] rounded-2xl ">
          <h1 className=" text-[2.5vh] ">Visitors</h1>
          <p className="font-semibold text-[4vh]">1,538</p>
          <div>
            <p className="bg-[#fff] text-green-600 rounded-xl font-semibold mt-[2vh] w-[11vw] text-center px-[1vh]">
              +14.9 %
            </p>
          </div>
        </div>
        <div className="bg-[#feebe6db] shadow-md px-[3vh] py-[2vh] rounded-2xl ">
          <h1 className=" text-[2.5vh] ">Average Order Value</h1>
          <p className="font-semibold text-[4vh]">1,538</p>
          <div>
            <p className="bg-[#fff] text-green-600 rounded-xl font-semibold mt-[2vh] w-[11vw] text-center px-[1vh]">
              +14.9 %
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto">
        <img src="/adminchart.jpg" alt="adminchart" />
      </div>
      <div className="m-[5vh]">
        <div className="flex flex-row justify-between ">
          <h1 className="text-2xl font-semibold">Recent Orders</h1>
          <Link href={<Order />}>
            <button className=" text-blue-500 border-[0.1vh] border-[#0000001d] font-bold  w-full  md:w-[8vw] rounded-md py-[1vh] md:py-[1vh] px-[3vh]">
              View All
            </button>
          </Link>
        </div>
        <div>
          <table className="min-w-full divide-y divide-gray-200 my-[5vh]">
            <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              </tr>

            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.q}</td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};
