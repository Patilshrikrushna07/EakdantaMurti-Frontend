import React,{useEffect} from 'react';
import { useRouter } from 'next/router';
import { isAdmin } from '../utils/auth';
import Sidebar from '../components/AdminDashboard/Sidebar';

export default function AdminPanel() {

  const router = useRouter();

  // useEffect(()=>{
  //   const userData = sessionStorage.getItem("userData");
  //   if(!userData){
  //     router.push("/login");
  //   }else{
  //     const {isAdmin}=JSON.parse(userData);
  //     if(!isAdmin){
  //       router.push("/admin");
  //     }
  //   }
  // },[])

  return (
    <div>
      <h1 className="text-[4vh] text-center my-[5vh]">AdminPanel</h1>
      <Sidebar/>
    </div>
  )
}
