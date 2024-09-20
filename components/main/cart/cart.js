"use client";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef, useState } from "react";
import Spinner from "../home/spinner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SiTicktick } from "react-icons/si";
import { ReloadIcon } from "@radix-ui/react-icons";
import { IoReloadOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Cart() {
  const [data, setData] = useState([]);

  const [disableBtn, setDisableBtn] = useState(false);

  const [checkUser, setCheckUser] = useState(false);

  const [loader, setLoader] = useState(false);
  const [availability, setAvailability] = useState(false);

  const [disableRemoveBtn, setDisableRemoveBtn] = useState(false);

  const [totalAmount, setTotalAmount] = useState([]);

  const [finalTotal, setFinalTotal] = useState();

  const dialogref = useRef(null);

  const [msg, setMsg] = useState();

  const [loading, setLoading] = useState(false);

  const [costumerId, setCostumerId] = useState();

  const router = useRouter();

  const calculateTotal = () => {
    const ans = totalAmount.reduce((sum, item) => {
      let convertedPrices = Number(item.price);
      return sum + convertedPrices;
    }, 0);

    setFinalTotal(ans);
  };

  useEffect(() => {
    calculateTotal();
  });

  const fetchData = async (input) => {
    const costumerJson = localStorage.getItem("costumer");
    const costumerId = costumerJson && JSON.parse(costumerJson)._id;
    setCostumerId(costumerId);
    if (input?.type === "removeFromCart") {
      setLoader(false);
      setDisableRemoveBtn(true);
      setAvailability(true);
    } else {
      setLoader(true);
    }
    try {
      const res = await fetch(`/api/orders/getcartitems/${costumerId}`);
      const data = await res.json();
      if (data.success) {
        setData(data.result);
        setAvailability(true);
        setTotalAmount(
          data.result.map((item) => ({ price: item.price, id: item._id }))
        );
      } else {
        setAvailability(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setDisableRemoveBtn(false);
    }
  };

  useEffect(() => {
    fetchData();
    setCheckUser(true);
  }, []);

  const handleQuantityChange = async (item, operation) => {
    setDisableBtn(true);
    try {
      let newQuantity =
        operation === "increment" ? item.quantity + 1 : item.quantity - 1;
      if (newQuantity < 1) {
        newQuantity = 1;
      }
      item.quantity = newQuantity;

      const res = await fetch("/api/orders/handlequantity", {
        method: "PUT",
        body: JSON.stringify(item),
      });
      const data = await res.json();
      if (data.success) {
        setData((prevData) =>
          prevData.map((prevItem) =>
            prevItem._id === data.result._id ? data.result : prevItem
          )
        );
        console.log(typeof finalTotal);
        setTotalAmount((prevItems) =>
          prevItems.map((item) =>
            item.id === data.result._id
              ? { ...item, price: data.result.price }
              : item
          )
        );
        calculateTotal();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDisableBtn(false);
    }
  };

  const { toast } = useToast();

  const removeFromCart = async (item) => {
    const res = await fetch("/api/orders/deleteitem", {
      method: "DELETE",
      body: JSON.stringify(item),
    });

    const data = await res.json();

    if (data.success) {
      toast({
        description: "item deleted successfully",
      });
      fetchData({ type: "removeFromCart" });
    }
  };

  async function handleOrderNow() {
    try {
      setLoading(true);
      const res = await fetch("/api/orders/confirmorder", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const ans = await res.json();
      if (ans.success) {
        dialogref.current?.click();
        const res = await fetch("/api/orders/clearcart", {
          method: "DELETE",
          body: JSON.stringify({ _id: costumerId }),
        });
        setMsg(ans.message);
      } else {
        dialogref.current?.click();
        setMsg(ans.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!checkUser ? (
        <div
          style={{ height: "calc(100vh - 160px)" }}
          className="w-full bg-white flex items-center justify-center"
        >
          <p className="text-3xl font-semibold">Please login see cart item</p>
        </div>
      ) : loader ? (
        <Spinner />
      ) : (
        <section
          style={{ minHeight: "calc(100vh - 160px)" }}
          className="w-full top-0 left-0 z-50 py-5 px-4 bg-gray-200"
        >
          <h1 className="text-center text-2xl font-semibold mb-5">My Cart</h1>
          {!availability ? (
            <p className="text-center text-3xl my-10">No item in the cart</p>
          ) : (
            <>
              <div className="bg-white w-full">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-16 py-3">
                          <span>Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((item) => {
                          return (
                            <>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                  <Image
                                    width={64}
                                    height={64}
                                    src={item.image}
                                    className="w-16 md:w-32 max-w-full max-h-full"
                                    alt="Apple Watch"
                                  />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                  {item.name}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center">
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          { type: "decrement", ...item },
                                          "decrement"
                                        )
                                      }
                                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                      type="button"
                                      disabled={disableBtn}
                                    >
                                      <span className="sr-only">
                                        Quantity button
                                      </span>
                                      <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 2"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M1 1h16"
                                        />
                                      </svg>
                                    </button>
                                    <div>
                                      <input
                                        type="text"
                                        id="first_product"
                                        value={item.quantity}
                                        className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Quanitity"
                                        required
                                      />
                                    </div>
                                    <button
                                      disabled={disableBtn}
                                      onClick={() =>
                                        handleQuantityChange(
                                          { type: "increment", ...item },
                                          "increment"
                                        )
                                      }
                                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                      type="button"
                                    >
                                      <span className="sr-only">
                                        Quantity button
                                      </span>
                                      <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 18"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M9 1v16M1 9h16"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                  RS.{item.price}
                                </td>
                                <td className="px-6 py-4">
                                  <button
                                    disabled={disableRemoveBtn}
                                    onClick={() =>
                                      removeFromCart({ _id: item._id })
                                    }
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-full max-w-[550px] mx-auto py-3 bg-white flex flex-col px-2 mt-4">
                <span className="flex justify-between text-lg">
                  <h1>Item Prices :</h1>

                  <h1 className="font-semibold">
                    Rs.{finalTotal && finalTotal}
                  </h1>
                </span>
                <span className="flex justify-between text-lg">
                  <h1>Tax(10%) :</h1>

                  <h1 className="font-semibold">
                    Rs.{(finalTotal * 0.1).toFixed(2)}
                  </h1>
                </span>
                <span className="flex justify-between text-lg">
                  <h1>Delivery Charges :</h1>

                  <h1 className="font-semibold">Rs.200</h1>
                </span>
                <span className="flex justify-between text-lg">
                  <h1>Total Price :</h1>

                  <h1 className="font-semibold">
                    Rs.{finalTotal + Math.floor(finalTotal * 0.1) + 200}
                  </h1>
                </span>
                {loading ? (
                  <Button className="w-full">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <button
                    onClick={handleOrderNow}
                    className="bg-orange-400 py-1 font-bold text-white w-full rounded-[7px] mt-2 hover:bg-orange-500 transition-all ease-in-out duration-200"
                  >
                    Order Now
                  </button>
                )}
              </div>
            </>
          )}
          <AlertDialog>
            <AlertDialogTrigger className="hidden" ref={dialogref}>
              Open
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white w-[95%]">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {msg ===
                  "Please wait for your previous order to completed" ? (
                    <IoReloadOutline className="mx-auto text-4xl animate-spin text-red-500" />
                  ) : (
                    <SiTicktick
                      id="confirmationTick"
                      className="text-green-500 mx-auto"
                    />
                  )}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  {msg}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                {msg === "Please wait for your previous order to completed" ? (
                  <>
                    <AlertDialogCancel>Continue</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => router.push("/order/vieworder")}
                    >
                      View Order
                    </AlertDialogAction>
                  </>
                ) : (
                  <>
                    <AlertDialogCancel onClick={() => fetchData()}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => router.push("/order/vieworder")}
                    >
                      View Order
                    </AlertDialogAction>
                  </>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      )}
    </>
  );
}
