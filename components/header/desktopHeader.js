import Image from "next/image";
import logo from "./logo.webp";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../redux/slices/forceRender";
export default function DesktopHeader() {
  const router = useRouter();

  const [name, setName] = useState("");

  const disptach = useDispatch();

  const forceRender = useSelector((store) => store.forceRender);

  const handleLogOut = () => {
    localStorage.removeItem("costumer");
    disptach(increment());
    alert("User logout");
  };

  useEffect(() => {
    const costumerJson = localStorage.getItem("costumer");

    const parsedObj = costumerJson && JSON.parse(costumerJson);

    const name = parsedObj?.name;
    setName(name);
  }, [forceRender.value]);

  return (
    <>
      <header className="w-full hidden md:flex flex-row items-center border justify-between h-[80px] pr-3 bg-white">
        <Image alt="resturantLogo" src={logo} width={100} height={100} />
        <ul className="flex gap-3 text-lg">
          <Link
            href="/"
            className="hover:text-blue-500 transition-all ease-in-out duration-100"
          >
            Home
          </Link>
          <Link
            href="/cart"
            className="hover:text-blue-500 transition-all ease-in-out duration-100"
          >
            Cart
          </Link>
          <Link
            href="/order/vieworder"
            className="hover:text-blue-500 transition-all ease-in-out duration-100"
          >
            Orders
          </Link>
          <Link
            href="/about"
            className="hover:text-blue-500 transition-all ease-in-out duration-100"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-blue-500 transition-all ease-in-out duration-100"
          >
            Contact
          </Link>
        </ul>
        {name ? (
          <div className="flex items-center justify-center gap-2 mr-10">
            <button
              onClick={handleLogOut}
              className="border rounded-2xl py-2 w-20 hover:bg-black hover:border-black hover:text-white  transition-all ease-in-out duration-300"
            >
              Log Out
            </button>
            <p className="text-sm text-red-500">{name}</p>
            <CgProfile
              onClick={() => router.push("/costumer")}
              className="text-2xl cursor-pointer text-gray-700"
            />
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/costumer/costumerauth")}
              className="border rounded-2xl py-2 w-20 hover:bg-black hover:border-black hover:text-white  transition-all ease-in-out duration-300"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/costumer/costumerauth")}
              className="border border-black bg-black text-white rounded-2xl py-2 w-20 "
            >
              Signup
            </button>
          </div>
        )}
      </header>
    </>
  );
}
