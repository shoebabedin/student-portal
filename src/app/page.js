"use client";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

function MyPage() {
  const auth = useAuth();

 

 console.log(auth.currentUser);


  return <>
  {/* {auth.currentUser == null ? <Authentication /> : redirect('/home')} */}
  {auth.currentUser == null ? redirect('/auth') : redirect('/home')}
  </>;
}

export default MyPage;
