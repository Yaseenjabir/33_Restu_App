"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toggleValue } from "../../../redux/slices/handleCart";
import { useRouter } from "next/navigation";

export default function SideCart() {
  const [data, setData] = useState([]);

  async function fetchData(costumerId) {
    const res = await fetch(`/api/orders/getcartitems/${costumerId}`);
    const data = await res.json();
    console.log(data);
    if (data.success) {
      setData(data.result);
    }
  }

  const router = useRouter();

  const value = useSelector((store) => store.cartSlice.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const costumerJson = localStorage.getItem("costumer");
    const costumerId = costumerJson && JSON.parse(costumerJson)._id;

    if (costumerId) {
      fetchData(costumerId);
    }
  }, []);

  return (
    <>
      <section
        className={`fixed flex flex-col p-5 w-full h-screen z-50
           top-0 right-0 md:rounded-l-[10px] md:border-l bg-white md:w-[600px] transition-all ease-in-out duration-300 ${
             value ? "translate-x-0" : "translate-x-full"
           }`}
      >
        <h1 className="text-center text-2xl font-medium">Your cart</h1>
        <div className="my-6 flex flex-col items-center justify-center overflow-y-auto max-h-[70vh]">
          {data &&
            data.map((item) => {
              return (
                <>
                  <div className="flex border-b w-full my-5 max-w-[520px]">
                    <Image
                      alt="image"
                      src={item.image}
                      width={120}
                      height={120}
                    />
                    <div className="flex flex-col justify-between px-5 w-full">
                      <h1 className="text-[18px] font-light max-w-[150px] leading-5">
                        {item.name}
                      </h1>
                      <div className="flex justify-end w-full gap-10 text-sm">
                        <span className="text-gray-600">
                          Qty :{" "}
                          <span className="font-semibold text-black">
                            {item.quantity}
                          </span>
                        </span>
                        <span className="font-bold">Rs.{item.price}</span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <div className="mt-auto max-w-[520px] mx-auto w-full">
          <div className="text-gray-700">
            <span className="flex justify-between">
              <span>Qty :</span>
              <span className="text-black font-semibold">
                {data && data.length}
              </span>
            </span>
            <span className="flex justify-between">
              <span>Total Price :</span>
              <span className="text-black font-semibold">
                {data.reduce((sum, item) => {
                  const convertedPrices = Number(item.price);
                  return sum + convertedPrices;
                }, 0)}
              </span>
            </span>
            <button
              onClick={() => {
                dispatch(toggleValue());
                router.push("/cart");
              }}
              className="w-full mt-4 bg-red-600 rounded-[5px] py-2 text-white font-semibold hover:bg-red-700 transition-all duration-150 ease-in-out"
            >
              Check Out
            </button>
          </div>
        </div>
        <RxCross1
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => dispatch(toggleValue())}
        />
      </section>
    </>
  );
}
