"use client";

import { useRouter } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiShutDownLine } from "react-icons/ri";
export default function LogoutBtn() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("restaurant");
    router.push("/user/userauth");
  };

  return (
    <>
      <li
        onClick={logout}
        className="border border-white text-white cursor-pointer py-2 px-3 rounded-[5px] flex flex-row-reverse items-center hover:bg-white hover:text-blue-500 transition-all ease-in-out duration-300 justify-end gap-2"
      >
        <h1 className="text-sm">Logout</h1>
        <RiShutDownLine />
      </li>
    </>
  );
}
