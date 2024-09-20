"use client";

import { useEffect, useState } from "react";

import { AiOutlineReload } from "react-icons/ai";

export default function ViewOrder() {
  const [data, setData] = useState({});

  const [itemNames, setItemNames] = useState([]);

  const [status, setStatus] = useState({});

  const [date, setDate] = useState();

  const [quantity, setQuantity] = useState();

  const [totalPrice, setTotalPrice] = useState();

  const [completed, setCompleted] = useState(false);

  const [costumer_id, setCostumer_id] = useState();

  const [btnLoader, setBtnLoader] = useState(false);

  async function fetchData(_id) {
    const res = await fetch(`/api/costumer/getconfirmedorder/${_id}`);
    const data = await res.json();
    if (data.success) {
      setData(data.result);
    }
  }
  useEffect(() => {
    const costumerJson = localStorage.getItem("costumer");
    const costumer = costumerJson && JSON.parse(costumerJson);
    setCostumer_id(costumer._id);
    fetchData(costumer_id);
  }, [costumer_id]);

  useEffect(() => {
    const convertDate = (data) => {
      let date = new Date(data && data.createdAt);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      };
      const formattedDate = date.toLocaleString("en-US", options);
      setDate(formattedDate);
    };
    convertDate(data);

    const getItemNames = (data) => {
      if (data && Array.isArray(data.items)) {
        const itemNames = data.items.map((item) => item.name);
        setItemNames(itemNames);
      }
    };
    getItemNames(data);

    const calculateQuantity = (data) => {
      if (data && Array.isArray(data.items)) {
        const quantity = data.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setQuantity(quantity);
      }
    };
    calculateQuantity(data);

    const calculateTotalPrice = (data) => {
      if (data && Array.isArray(data.items)) {
        const totalPrice = data.items.reduce((sum, item) => {
          const convertedPrice = Number(item.price);
          return sum + convertedPrice;
        }, 0);
        setTotalPrice(totalPrice);
      }
    };
    calculateTotalPrice(data);
  }, [data]);

  console.log(data.status);

  useEffect(() => {
    let status = {
      pending: false,
      accepted: false,
      ready: false,
      recevied: false,
      dispatched: false,
      completed: false,
      rejected: false,
    };
    if (data.status === "pending") {
      setCompleted(false);
      status.pending = true;
    } else if (data.status === "accepted") {
      setCompleted(false);
      status.pending = true;
      status.accepted = true;
    } else if (data.status === "ready") {
      setCompleted(false);
      status.pending = true;
      status.accepted = true;
      status.ready = true;
    } else if (data.status === "received") {
      status.pending = true;
      status.accepted = true;
      status.ready = true;
      status.recevied = true;
      setCompleted(false);
    } else if (data.status === "dispatch") {
      setCompleted(true);
      status.pending = true;
      status.accepted = true;
      status.ready = true;
      status.recevied = true;
      status.dispatched = true;
    } else if (data.status === "completed") {
      status.pending = true;
      status.accepted = true;
      status.ready = true;
      status.recevied = true;
      status.dispatched = true;
      status.completed = true;
      setCompleted(true);
    } else if (data.status === "rejected") {
      status.pending = false;
      status.accepted = false;
      status.ready = false;
      status.recevied = false;
      status.dispatched = false;
      status.completed = false;
      status.rejected = true;
    }

    setStatus(status);
  }, [data.status]);

  async function confirmOrder(_id) {
    try {
      setBtnLoader(true);
      const res = await fetch("/api/orders/completeorder", {
        method: "PUT",
        body: JSON.stringify({ _id }),
      });
      const ans = await res.json();
      if (ans.success) {
        fetchData(costumer_id);
        const res = await fetch("/api/orders/completedorders", {
          method: "POST",
          body: JSON.stringify(ans.result),
        });
        const ans2 = await res.json();
        if (ans2.success) {
          const res = await fetch("/api/orders/deletedeliveredorder", {
            method: "DELETE",
            body: JSON.stringify({ _id: ans.result._id }),
          });
          const ans3 = await res.json();
          console.log("ans3 :", ans3);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoader(false);
    }
  }

  const deleteRejectedOrder = async (_id) => {
    const res = await fetch("/api/user/deleterejectedorder", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <section className="w-full min-h-screen flex flex-col items-center justify-center">
        {data._id ? (
          <div className="bg-white w-full max-w-[430px] mx-auto shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
            <div className="mb-4">
              <h1 className="text-gray-600 flex gap-1 flex-wrap">
                <strong>Order ID:</strong>{" "}
                <p>{data._id ? data._id : "Loading..."}</p>
              </h1>
              <h1 className="text-gray-600 flex gap-1 flex-wrap">
                <strong>Order Date:</strong>{" "}
                <p>{data.createdAt ? date : "Loading..."}</p>
              </h1>
              <h1 className="text-gray-600 flex gap-1 flex-wrap">
                <strong>Items:</strong>{" "}
                {itemNames.length > 0 &&
                  itemNames.map((item) => <p>{item},</p>)}
              </h1>
              <h1 className="text-gray-600 flex gap-1 flex-wrap">
                <strong>Quantity:</strong>{" "}
                <p>{quantity ? quantity : "Loading..."}</p>
              </h1>
              <h1 className="text-gray-600 flex gap-1 flex-wrap">
                <strong>Total Price:</strong>{" "}
                <p>Rs {totalPrice ? totalPrice : "Loading..."}</p>
              </h1>
              <h1 className="text-gray-600">
                <strong>Delivery Address:</strong>{" "}
                <p>{data && data?.costumer?.location}</p>
              </h1>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Order Status</h3>
              {status.rejected ? (
                <>
                  <p>
                    Sorry your order cannot be completed, please order from
                    another restaurant
                  </p>
                  <button
                    onClick={() => deleteRejectedOrder(data._id)}
                    className="w-full bg-red-500 py-2"
                  >
                    Mark as rejected
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-4">
                    <div className="w-1/4">
                      <div className="relative flex items-center">
                        <div className="absolute -left-3 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              status?.pending ? "bg-blue-500" : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                        <div className="w-full ml-5 py-2 text-center text-sm font-medium text-gray-600">
                          Pending
                        </div>
                      </div>
                      <div className="relative flex items-center">
                        <div className="absolute -left-3 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              status?.accepted ? "bg-blue-500" : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                        <div className="w-full ml-5 py-2 text-center text-sm font-medium text-gray-600">
                          Accepted
                        </div>
                      </div>
                      <div className="relative flex items-center">
                        <div className="absolute -left-3 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              status?.ready ? "bg-blue-500" : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                        <div className="w-full ml-2 py-2 text-center text-sm font-medium text-gray-600">
                          Ready
                        </div>
                      </div>
                      <div className="relative flex items-center">
                        <div className="absolute -left-3 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              status?.recevied ? "bg-blue-500" : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                        <div className="w-full ml-5 py-2 text-center text-sm font-medium text-gray-600">
                          Received
                        </div>
                      </div>
                      <div className="relative flex items-center">
                        <div className="absolute -left-3 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
                          <div
                            className={`w-3 h-3 rounded-full  ${
                              status?.dispatched ? "bg-blue-500" : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                        <div className="w-full ml-1 py-2 px-4 text-center text-sm font-medium text-gray-600">
                          Dispatched
                        </div>
                      </div>
                      <div className="relative flex items-center">
                        <div className="absolute -left-3 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              status?.completed ? "bg-blue-500" : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                        <div className="w-full ml-1 py-2 px-4 text-center text-sm font-medium text-gray-600">
                          Completed
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {!status.rejected && (
              <div className="flex space-x-4 flex-col">
                {btnLoader ? (
                  <button
                    className={`bg-green-500 self-center w-full text-white px-4 py-2 rounded hover:bg-green-600 transition items-center justify-center flex `}
                  >
                    <AiOutlineReload className="text-2xl animate-spin" />
                  </button>
                ) : status.completed ? (
                  <h1 className="text-center text-xl font-semibold">
                    Thanks for confirming order
                  </h1>
                ) : (
                  <button
                    onClick={() => confirmOrder(data._id)}
                    disabled={!completed}
                    className={`bg-green-500 self-center w-full text-white px-4 py-2 rounded hover:bg-green-600 transition ${
                      !completed
                        ? "cursor-not-allowed bg-gray-500 hover:bg-gray-500"
                        : "cursor-pointer"
                    }`}
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-xl font-semibold">No item ordered</p>
        )}
      </section>
    </>
  );
}
