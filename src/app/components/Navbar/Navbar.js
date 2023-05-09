"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { CgUser } from "react-icons/cg";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  const auth = useAuth();
  const router = useRouter();
  const [menu, setMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.logout();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const hendleMenu = () => {
    setMenu(!menu);
    console.log("click");
  };
  return (
    <>
      <div className="shadow-md sticky top-0 bg-white w-full">
        <div className="container">
          <div className="flex items-center justify-between py-2">
            <div className="logo">
              <p className="font-bold text-xl text-black">BYKKC</p>
            </div>

            {auth?.currentUser ? (
              <>
                <div className=" items-center justify-between gap-x-3 hidden md:flex">
                  <ul className="flex items-center justify-start md:gap-4 flex-wrap sm:gap-2">
                    <li>
                      <Link
                        href="/home"
                        className="text-black font-medium text-base"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/total-branch"
                        className="text-black font-medium text-base"
                      >
                        Total Branch
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/total-students"
                        className="text-black font-medium text-base"
                      >
                        Total Student
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/total-teacher"
                        className="text-black font-medium text-base"
                      >
                        Total Teacher
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/attendance"
                        className="text-black font-medium text-base"
                      >
                        Attendance
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-between gap-x-3">
                  <Link href="/profile" className="border py-1 px-2 rounded-md shadow-md flex items-center justify-between  text-black">
                    <CgUser />
                    <span className="text-black">
                      {auth.currentUser.displayName}
                    </span>
                  </Link>
                  <button
                    className="border py-2 px-2 rounded-md shadow-md  text-black hidden md:block"
                    onClick={handleLogout}
                  >
                    <AiOutlineLogout />
                  </button>
                  <div className="mob-menu">
                    <button
                      className="border py-2 px-2 rounded-md shadow-md  text-black block md:hidden"
                      onClick={hendleMenu}
                    >
                      <HiOutlineMenuAlt3 />
                    </button>
                    {menu && (
                      <ul
                        className={`flex items-center flex-col justify-center gap-4 absolute left-0 bg-black w-full h-screen z-10 ease-linear delay-500 ${
                          menu ? "top-0 " : "-top-full"
                        }`}
                      >
                        <button
                          className="border py-2 px-2 rounded-md shadow-md  text-white block md:hidden absolute top-3 right-3"
                          onClick={hendleMenu}
                        >
                          <HiOutlineMenuAlt3 />
                        </button>
                        <li>
                          <Link
                            href="/home"
                            className="text-white font-medium text-base"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/total-branch"
                            className="text-white font-medium text-base"
                          >
                            Total Branch
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/total-students"
                            className="text-white font-medium text-base"
                          >
                            Total Student
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/total-teacher"
                            className="text-white font-medium text-base"
                          >
                            Total Teacher
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/attendance"
                            className="text-black font-medium text-base"
                          >
                            Attendance
                          </Link>
                        </li>
                        <li>
                          <button className="text-white" onClick={handleLogout}>
                            LogOut
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between gap-x-3">
                <button className="font-medium text-lg  text-black">
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
