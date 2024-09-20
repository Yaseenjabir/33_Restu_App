"use client";
import { useEffect, useState } from "react";
import UserSignup from "../../../../components/main/user/userauth/usersignup";
import UserLogin from "../../../../components/main/user/userauth/userlogin";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const restaurant = localStorage.getItem("restaurant");
    if (restaurant) {
      router.push("/user/restaurantfood");
    }
  }, []);

  return (
    <>
      <main className="py-10 w-full flex flex-col justify-center items-center">
        {isLogin ? (
          <UserLogin setIsLogin={setIsLogin} />
        ) : (
          <UserSignup setIsLogin={setIsLogin} />
        )}
      </main>
    </>
  );
};

export default Page;
