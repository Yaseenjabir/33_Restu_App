"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CheckOut() {
  const [searchParams] = useSearchParams();
  const stringifyObj = searchParams[1];
  const myObject = stringifyObj && JSON.parse(stringifyObj);

  const router = useRouter();

  useEffect(() => {
    const costumerJson = localStorage.getItem("costumer");
    const costumerId = costumerJson && JSON.stringify(costumerJson);
    if (!costumerId) {
      router.push("/costumer/costumerauth");
    }
  }, []);

  return (
    <>
      <section
        style={{ height: "calc(100vh - 160px)" }}
        className="w-full py-10 flex flex-col items-center justify-center"
      >
        <h1 className="text-center text-3xl font-semibold">
          Checkout your order
        </h1>
        <div className="w-full bg-gray-100 max-w-[550px] mx-auto py-3 flex flex-col px-5 rounded mt-4">
          <span className="flex justify-between text-lg">
            <h1>Item Prices :</h1>

            <h1 className="font-semibold">
              Rs.{myObject && myObject.ItemPrices}
            </h1>
          </span>
          <span className="flex justify-between text-lg">
            <h1>Tax(10%) :</h1>

            <h1 className="font-semibold">Rs.{myObject && myObject.Tax}</h1>
          </span>
          <span className="flex justify-between text-lg">
            <h1>Delivery Charges :</h1>

            <h1 className="font-semibold">
              Rs.{myObject && myObject.DeliveryCharges}
            </h1>
          </span>
          <span className="flex justify-between text-lg">
            <h1>Total Price :</h1>

            <h1 className="font-semibold">
              Rs.{myObject && myObject.TotalPrice}
            </h1>
          </span>
          <span className="flex justify-between text-lg">
            <h1>Payment Method :</h1>

            <h1 className="font-semibold text-red-500">
              Cash On Delivery (only)
            </h1>
          </span>
          <button className="bg-orange-400 py-1 font-bold text-white w-full rounded-[7px] mt-2 hover:bg-orange-500 transition-all ease-in-out duration-200">
            Order Now
          </button>
        </div>
      </section>
    </>
  );
}
