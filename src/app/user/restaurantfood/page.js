"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RestaurantSidebar from "../../../../components/main/user/restaurantItems/sidebar";
import RestaurantContent from "../../../../components/main/user/restaurantItems/content";

const Page = () => {
  const router = useRouter();

  const [tab, setTab] = useState("dashboard");

  useEffect(() => {
    const checkLogin = JSON.parse(localStorage.getItem("restaurant"));
    if (!checkLogin) {
      router.push("/user/userauth");
    }
  }, []);
  return (
    <>
      <section className="w-full min-h-[100vh] flex flex-col lg:flex-row ">
        <RestaurantSidebar tab={tab} setTab={setTab} />
        <RestaurantContent tab={tab} />
      </section>
    </>
  );
};

export default Page;
