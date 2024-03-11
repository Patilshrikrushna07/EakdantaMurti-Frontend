import React,{useEffect} from 'react';
import { useRouter } from 'next/router';
import { isAdmin } from '../utils/auth';
import Sidebar from '../components/AdminDashboard/Sidebar';
import AddProduct from '@/components/AdminDashboard/SidebarComponent/AddProduct';

export default function AdminPanel({products}) {

  return (
    <div className='bg-[#fffffff8]'>
      <Sidebar products={products}/>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiUrl}/get-all-products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();

    return {
      props: {
        products: products || [],
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
        error: "Failed to fetch products",
      },
    };
  }
}
