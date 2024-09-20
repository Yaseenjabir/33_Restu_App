"use client";

import { useEffect, useState } from "react";
import CostumerSignup from "../../../../components/main/costumer/costumerSignup";
import CostumerLogin from "../../../../components/main/costumer/costumerLogin";
import { useRouter } from "next/navigation";

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const costumer = localStorage.getItem("costumer");
    if (costumer) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <main className="w-full flex flex-col justify-center items-center">
        {isLogin ? (
          <CostumerLogin setIsLogin={setIsLogin} />
        ) : (
          <CostumerSignup setIsLogin={setIsLogin} />
        )}
      </main>
    </>
  );
}
