import React, { useState } from 'react';
import Link from 'next/link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Dashboard } from './SidebarComponent/Dashboard';
import { Order } from './SidebarComponent/Order';
import AddProduct from './SidebarComponent/AddProduct';

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState(null); // State to hold the active component

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-800 h-screen w-64  top-0 left-0 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-white text-lg font-semibold text-center">Admin Panel</h2>
        </div>
        <nav className="text-white">
          <ul className="py-4">
            <li className="px-4 py-2">
              <div onClick={() => handleComponentChange(<Dashboard />)} className="cursor-pointer">
                <DashboardIcon className="mr-2" />
                Dashboard
              </div>
            </li>
            <li className="px-4 py-2">
              <div onClick={() => handleComponentChange(<Order />)} className="cursor-pointer">
              <ShoppingCartIcon className="mr-2" />
                Order
              </div>
            </li>
            <li className="px-4 py-2">
            <div onClick={() => handleComponentChange(<AddProduct />)} className="cursor-pointer">
            <StorefrontIcon className="mr-2" />
                Add Product
              </div>
            </li>
            <li className="px-4 py-2">
              <Link href="/customers">
                <span className="flex items-center">
                  <PeopleIcon className="mr-2" />
                  Customers
                </span>
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link href="/reports">
                <span className="flex items-center">
                  <AssessmentIcon className="mr-2" />
                  Reports
                </span>
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link href="/settings">
                <span className="flex items-center">
                  <SettingsIcon className="mr-2" />
                  Settings
                </span>
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link href="/logout">
                <span className="flex items-center">
                  <LogoutIcon className="mr-2" />
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Active Component */}
      <div className="ml-64 p-8">
        {activeComponent}
      </div>
    </div>
  );
};

export default Sidebar;
