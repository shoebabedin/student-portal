"use client";

import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import Authentication from "./components/Authentication/Authentication";

function MyPage() {
  const auth = useAuth();

 


  return <>
  {auth.currentUser == null ? <Authentication /> : redirect('/home')}
  </>;
}

export default MyPage;
