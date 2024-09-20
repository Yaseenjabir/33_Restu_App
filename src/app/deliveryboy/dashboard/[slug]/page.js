"use client";

import { useEffect, useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import Spinner from "../../../../../components/main/home/spinner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OrderDetails({ params }) {
  const _id = params.slug;

  const [deliveryboyId, setDeliveryBoyId] = useState();

  const [dataLoader, setDataLoader] = useState(false);

  const [data, setData] = useState({});

  const router = useRouter();

  const [status, setStatus] = useState("");

  const fetchData = async () => {
    try {
      setDataLoader(true);
      const res = await fetch(`/api/deliveryboy/getsingleorder/${_id}`);
      const data = await res.json();
      if (data.result) {
        setStatus(data.result.status);
        setData(data.result);
      } else {
        router.push("/deliveryboy/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDataLoader(false);
    }
  };
  async function handleAccept() {
    const res = await fetch("/api/deliveryboy/updateorder", {
      method: "PUT",
      body: JSON.stringify({ _id, type: "received", deliveryboyId }),
    });
    const data = await res.json();
    console.log(data);
    setData(data.result);
    fetchData();
  }

  async function handleDispatch() {
    const res = await fetch("/api/deliveryboy/updateorder", {
      method: "PUT",
      body: JSON.stringify({ _id, type: "dispatch" }),
    });
    const data = await res.json();
    if (data.result) {
      fetchData();
      setData(data.result);
    }
  }

  useEffect(() => {
    const deliveryJson = localStorage.getItem("deliveryboy");
    const deliveryBoyId = JSON.parse(deliveryJson)._id;
    setDeliveryBoyId(deliveryBoyId);
    fetchData();
  }, []);

  return (
    <>
      <section className="w-full min-h-screen py-10 flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-5 font-bold">Order Details</h1>
        {dataLoader ? (
          <Spinner />
        ) : (
          <div className="border rounded w-full max-w-[800px] py-5 px-2 flex flex-col gap-5">
            <table class="bg-white w-full border border-gray-300 rounded-lg shadow-md">
              <thead class="bg-orange-500 text-white">
                <tr>
                  <th class="py-2 px-4 border-b">No</th>
                  <th class="py-2 px-4 border-b">Name</th>
                  <th class="py-2 px-4 border-b">Price</th>
                  <th class="py-2 px-4 border-b">Image</th>
                  <th class="py-2 px-4 border-b">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {data.items &&
                  data?.items.map((item, index) => {
                    return (
                      <>
                        <tr key={item._id}>
                          <td class="py-2 px-4 border-b text-center">
                            {index + 1}
                          </td>
                          <td class="py-2 px-4 border-b text-center">
                            {item.name}
                          </td>
                          <td class="py-2 px-4 border-b text-center">
                            Rs.{item.price}
                          </td>
                          <td class="py-2 px-4 border-b text-center">
                            <Image
                              width={96}
                              height={96}
                              src={item.image}
                              class="w-24 h-auto mx-auto"
                            />
                          </td>
                          <td class="py-2 px-4 border-b text-center">
                            {item.quantity}
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
            <div className="w-full flex flex-col gap-5">
              <h1 className="text-lg text-gray-700 my-2">
                Costumer Details___
              </h1>
              <span className="flex gap-4 px-5 border-b items-center">
                <span className="font-semibold w-[73px]">Name: </span>
                <span>{data.items ? data?.costumer.name : "Loading..."}</span>
              </span>
              <span className="flex gap-4 px-5 border-b items-center">
                <span className="font-semibold w-[73px]">Email: </span>
                <span>
                  {data.items ? data?.costumer.emailAddress : "Loading..."}
                </span>
              </span>
              <span className="flex gap-4 px-5 border-b items-center">
                <span className="font-semibold w-[73px]">Location: </span>
                <span>
                  {data.items ? data?.costumer.location : "Loading..."}
                </span>
              </span>
            </div>
            <div className="w-full flex flex-col gap-5">
              <h1 className="text-lg text-gray-700 my-2">
                Restaurant Details___
              </h1>
              <span className="flex gap-4 px-5 border-b items-center">
                <span className="font-semibold w-[73px]">Name: </span>
                <span>{data.items ? data?.restaurant.name : "Loading..."}</span>
              </span>
              <span className="flex gap-4 px-5 border-b items-center">
                <span className="font-semibold w-[73px]">Email: </span>
                <span>
                  {data.items ? data?.restaurant.email : "Loading..."}
                </span>
              </span>
              <span className="flex gap-4 px-5 border-b items-center">
                <span className="font-semibold w-[73px]">Location: </span>
                <span>
                  {data.items ? data?.restaurant.location : "Loading..."}
                </span>
              </span>
              <span className="flex gap-4 px-5 border-b items-center">
                <span className="font-semibold w-[73px]">Contact: </span>
                <span>
                  {data.items ? data?.restaurant.contact : "Loading..."}
                </span>
              </span>
            </div>
            <div className="w-full flex flex-col gap-3">
              {status === "ready" ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleAccept}
                    className="w-full bg-green-500 py-2 rounded text-white font-bold hover:bg-green-600 transition-all ease-in-out duration-300"
                  >
                    Accept
                  </button>
                  <button className="w-full border border-red-500 py-2 rounded text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all ease-in-out duration-300">
                    Decline
                  </button>
                </div>
              ) : status === "received" ? (
                <>
                  <div className="w-full flex flex-col justify-center items-center">
                    <p className="text-center text-lg mb-3">
                      Please collect order from restaurant, then click{" "}
                      <span className="text-[#007BFF] font-semibold">
                        dispatch
                      </span>
                    </p>
                    <button
                      onClick={handleDispatch}
                      className="bg-[#007BFF] border border-[#007BFF] text-white py-2 w-full rounded font-bold transition-all ease-in-out duration-300 max-w-[500px] hover:bg-white hover:text-[#007BFF]"
                    >
                      Dispatch
                    </button>
                  </div>
                </>
              ) : status === "completed" ? (
                <div className="flex items-center justify-center">
                  <GiConfirmed
                    className="text-4xl text-green-500"
                    id="confirmationTick"
                  />
                  <p className=" text-lg mx-2">Order Delivered</p>
                </div>
              ) : (
                <p className="text-center text-gray-500 font-semibold">
                  The order will be marked as completed when costumer receive
                  it.
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
