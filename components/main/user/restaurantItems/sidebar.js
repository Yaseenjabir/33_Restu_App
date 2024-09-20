import { LuLayoutDashboard } from "react-icons/lu";
import LogoutBtn from "../../../../client_comps/restaurantComps/logoutBtn";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";
import { GrMoney } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { RiShutDownLine } from "react-icons/ri";

export default function RestaurantSidebar({ tab, setTab }) {
  const [className, setClassName] = useState(false);

  const classes =
    "border flex items-center justify-start py-1 bg-blue-500 rounded-[7px] text-white text-[15px] font-semibold px-3 gap-1 hover:bg-blue-600 transition-all ease-in-out duration-300";

  const router = useRouter();

  const [restuName, setRestuName] = useState();

  useEffect(() => {
    const Json = localStorage.getItem("restaurant");
    const parsed = Json && JSON.parse(Json);
    if (parsed) {
      setRestuName(parsed.name);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("restaurant");
    setClassName(false);
    router.push("/user/userauth");
  };
  return (
    <>
      <div className="w-[20%] hidden bg-blue-500 text-white rounded-r-2xl min-h-full lg:flex flex-col items-center py-5">
        <h1 className="text-2xl font-bold mb-20">Dashboard</h1>

        <h1 className="font-semibold text-lg">{restuName}</h1>
        <p className="text-sm font-bold">Welcome to your dashboard</p>
        <ul className="mt-10 flex flex-col gap-3 font-semibold w-[70%]">
          <li
            onClick={() => setTab("dashboard")}
            className={` cursor-pointer text-blue-500 py-2 px-3 rounded-[5px] flex flex-row-reverse items-center justify-end gap-2 ${
              tab === "dashboard"
                ? "bg-white text-blue-500"
                : "bg-transparent border-white text-white border"
            }`}
          >
            <h1 className="text-sm">Dashboard</h1>
            <LuLayoutDashboard />
          </li>
          <li
            onClick={() => setTab("addFood")}
            className={` cursor-pointer text-blue-500 py-2 px-3 rounded-[5px] flex flex-row-reverse items-center justify-end gap-2 ${
              tab === "addFood"
                ? "bg-white text-blue-500"
                : "bg-transparent border-white text-white border"
            }`}
          >
            <h1 className="text-sm">Add Food</h1>
            <IoMdAddCircleOutline />
          </li>
          <li
            onClick={() => setTab("orders")}
            className={` cursor-pointer text-blue-500 py-2 px-3 rounded-[5px] flex flex-row-reverse items-center justify-end gap-2 ${
              tab === "orders"
                ? "bg-white text-blue-500"
                : "bg-transparent border-white text-white border"
            }`}
          >
            <h1 className="text-sm">Orders</h1>
            <CiBoxList />
          </li>
          <li
            onClick={() => setTab("earning")}
            className={` cursor-pointer text-blue-500 py-2 px-3 rounded-[5px] flex flex-row-reverse items-center justify-end gap-2 ${
              tab === "earning"
                ? "bg-white text-blue-500"
                : "bg-transparent border-white text-white border"
            }`}
          >
            <h1 className="text-sm">Earning</h1>
            <GrMoney />
          </li>
          <LogoutBtn />
        </ul>
      </div>
      <div
        className={`fixed h-screen w-full bg-white z-50 border flex flex-col items-center justify-center transition-all ease-in-out duration-300 md:hidden ${
          className ? "translate-x-[0%]" : "translate-x-[-100%]"
        }`}
      >
        <ul className="flex flex-col gap-2 items-center text-xl">
          <button
            className={classes}
            style={{ width: 170 }}
            onClick={() => {
              setTab("dashboard");
              setClassName(false);
            }}
          >
            <LuLayoutDashboard />
            Dashboard
          </button>

          <button
            onClick={() => {
              setTab("addFood");
              setClassName(false);
            }}
            href="/user/restaurantfood"
            className={classes}
            style={{ width: 170 }}
          >
            <IoMdAddCircleOutline />
            Add Food
          </button>
          <button
            onClick={() => {
              setTab("earning");
              setClassName(false);
            }}
            href="/user/userauth"
            style={{ width: 170 }}
            className={classes}
          >
            <GrMoney />
            Earnings
          </button>
          <button
            onClick={() => {
              setTab("orders");
              setClassName(false);
            }}
            style={{ width: 170 }}
            href="/"
            className={classes}
          >
            <CiBoxList />
            Orders
          </button>
          <button
            style={{ width: 170 }}
            onClick={logout}
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
