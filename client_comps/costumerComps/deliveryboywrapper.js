"use client";
import { useRouter } from "next/navigation";

export default function DeliveryBoyWrapper() {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.push("/deliveryboy/deliverysignup")}
        className="bg-blue-500 px-3 py-2  rounded-xl font-semibold text-white"
      >
        Get started
      </button>
    </>
  );
}
