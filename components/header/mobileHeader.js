import Link from "next/link";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { VscAccount } from "react-icons/vsc";
import { IoIosLogOut } from "react-icons/io";
import { IoIosRestaurant } from "react-icons/io";
import { useRouter } from "next/navigation";
export default function MobileHeader({ username }) {
  const [className, setClassName] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("costumer");
    location.reload();
  };

  const [profile, setProfile] = useState(false);

  const router = useRouter();

  return (
    <>
      <div
        className={`fixed h-screen w-full bg-white z-50 border flex flex-col items-center justify-center transition-all ease-in-out duration-300 md:hidden ${
          className ? "translate-x-[0%]" : "translate-x-[100%]"
        }`}
      >
        <ul className="flex flex-col gap-5 items-center text-blue-500 text-2xl">
          <Link
            onClick={() => setClassName(false)}
            href="/"
            className="hover:text-black transition-all duration-200 hover:border-b-gray-500 w-min border border-transparent"
          >
            Home
          </Link>
          <Link
            onClick={() => setClassName(false)}
            href="/user/restaurantfood"
            className="hover:text-black transition-all duration-200 hover:border-b-gray-500 w-min border border-transparent"
          >
            Cart
          </Link>
          <Link
            onClick={() => setClassName(false)}
            href="/order/vieworder"
            className="hover:text-black text-nowrap transition-all duration-200 hover:border-b-gray-500 w-min border border-transparent"
          >
            Orders
          </Link>
          <Link
            onClick={() => setClassName(false)}
            href="/"
            className="hover:text-black transition-all duration-200 hover:border-b-gray-500 w-min border border-transparent"
          >
            About
          </Link>
          <Link
            onClick={() => setClassName(false)}
            href="/"
            className="hover:text-black transition-all duration-200 hover:border-b-gray-500 w-min border border-transparent"
          >
            Contact
          </Link>
        </ul>
        <RxCross2
          onClick={() => setClassName(false)}
          className="absolute top-5 right-5 text-3xl cursor-pointer"
        />
      </div>
      <header className="w-full h-[70px] md:hidden border-b flex justify-between px-3 items-center">
        <div className="relative">
          <>
            {username ? (
              <VscAccount
                onClick={() => setProfile((prev) => !prev)}
                className="text-2xl cursor-pointer"
              />
            ) : (
              <button
                onClick={() => router.push("/costumer/costumerauth")}
                className="bg-blue-500 text-[12px] text-white p-1 font-semibold rounded-xl border border-blue-500 hover:bg-white hover:text-blue-500 transition-all ease-in-out duration-200"
              >
                Get Started
              </button>
            )}

            {profile && (
              <div className="shadow-xl bg-gray-50 absolute flex flex-col gap-2 py-2 top-7 z-20 px-5 rounded-[3px]">
                <h1 className="text-nowrap font-semibold">{username}</h1>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1"
                >
                  <IoIosLogOut className="text-lg" />
                  Logout
                </button>
              </div>
            )}
          </>
        </div>
        <div className="flex items-center">
          <IoIosRestaurant className="text-3xl text-blue-500" />
          <h1 className="font-semibold text-blue-500">EatsEase</h1>
        </div>
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
