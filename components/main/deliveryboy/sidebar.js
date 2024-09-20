"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiShutDownLine } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
export default function SideBar({ setNavigate, navigate }) {
  const [deliveryboyName, setDeliveryBoyName] = useState();

  const router = useRouter();

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const deliveryJson = localStorage.getItem("deliveryboy");
    const deliveryboy = deliveryJson && JSON.parse(deliveryJson).fullName;
    if (!deliveryJson) {
      router.push("/deliveryboy/deliverylogin");
    }
    setDeliveryBoyName(deliveryboy);
  }, [router]);

  const handleLogout = async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    setLoader(true);

    try {
      await delay(3000);
      localStorage.removeItem("deliveryboy");
      router.push("/deliveryboy/deliverylogin");
      location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const [className, setClassName] = useState(false);

  const classes =
    "border flex items-center justify-start py-1 bg-blue-500 rounded-[7px] text-white text-[15px] font-semibold px-3 gap-1 hover:bg-blue-600 transition-all ease-in-out duration-300";

  return (
    <>
      <div className="w-[20%] hidden bg-blue-500 text-white rounded-r-2xl min-h-full lg:flex flex-col items-center py-5">
        <h1 className="text-2xl font-bold mb-20">Dashboard</h1>
        <h1 className="font-semibold text-lg">Hello {deliveryboyName}!</h1>
        <p className="text-sm font-bold">Welcome to your dashboard</p>
        <ul className="mt-10 flex flex-col gap-3 font-semibold w-[70%]">
          <li
            onClick={() => setNavigate("available orders")}
            className={` cursor-pointer text-blue-500 py-2 px-3 rounded-[5px] flex flex-row-reverse items-center justify-end gap-2 ${
              navigate === "available orders"
                ? "bg-white text-blue-500"
                : "bg-transparent border-white text-white border"
            }`}
          >
            <h1 className="text-sm">Orders</h1>
            <LuLayoutDashboard />
          </li>
          <li
            onClick={() => setNavigate("my profile")}
            className={` cursor-pointer text-blue-500 py-2 px-3 rounded-[5px] flex flex-row-reverse items-center justify-end gap-2 ${
              navigate === "my profile"
                ? "bg-white text-blue-500"
                : "bg-transparent border-white text-white border"
            }`}
          >
            <h1 className="text-sm">Profile</h1>
            <IoMdAddCircleOutline />
          </li>
          <li
            onClick={() => setNavigate("earnings")}
            className={` cursor-pointer text-blue-500 py-2 px-3 rounded-[5px] flex flex-row-reverse items-center justify-end gap-2 ${
              navigate === "earnings"
                ? "bg-white text-blue-500"
                : "bg-transparent border-white text-white border"
            }`}
          >
            <h1 className="text-sm">Earnings</h1>
            <CiBoxList />
          </li>

          {loader ? (
            <div className="text-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <li
              onClick={handleLogout}
              className="border border-white text-white cursor-pointer py-2 px-3 rounded-[5px] flex flex-row-reverse items-center hover:bg-white hover:text-blue-500 transition-all ease-in-out duration-300 justify-end gap-2"
            >
              <h1 className="text-sm">Logout</h1>
              <RiShutDownLine />
            </li>
          )}
        </ul>
      </div>
      <div
        className={`fixed h-screen w-full bg-white z-50 border flex flex-col items-center justify-center transition-all ease-in-out duration-300 md:hidden ${
          className ? "translate-x-[0%]" : "translate-x-[-100%]"
        }`}
      >
        <ul className="flex flex-col gap-2 items-center text-xl">
          <button
            onClick={() => {
              setNavigate("available orders");
              setClassName(false);
            }}
            style={{ width: 170 }}
            className={classes}
          >
            <CiBoxList />
            Orders
          </button>
          <button
            onClick={() => {
              setNavigate("earning");
              setClassName(false);
            }}
            style={{ width: 170 }}
            className={classes}
          >
            <GrMoney />
            Earnings
          </button>
          <button
            className={classes}
            style={{ width: 170 }}
            onClick={() => {
              setNavigate("my profile");
              setClassName(false);
            }}
          >
            <CgProfile />
            Profile
          </button>
          <button
            style={{ width: 170 }}
            onClick={handleLogout}
            href="/"
            className={classes}
          >
            <RiShutDownLine />
            Logout
          </button>
        </ul>
        <RxCross2
          onClick={() => setClassName(false)}
          className="absolute top-5 right-5 text-3xl cursor-pointer"
        />
      </div>
      <header className="justify-between lg:hidden pr-4 flex flex-row-reverse items-center px-2 h-[80px] w-full">
        <div
          onClick={() => setClassName(true)}
          className="w-7 h-7 relative flex flex-col gap-2 before:w-full before:h-full before:absolute before:top-0 before:left-0 cursor-pointer mt-2"
        >
          <hr />
          <hr />
          <hr />
        </div>
      </header>
    </>
  );
}
