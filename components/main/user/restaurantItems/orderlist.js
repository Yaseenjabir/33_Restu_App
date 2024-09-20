import { useEffect, useState } from "react";
import Spinner from "../../home/spinner";
import { useRouter } from "next/navigation";

export default function OrderList() {
  const [data, setData] = useState([]);

  const [restaurant_id, setRestaurant_id] = useState();

  const [availability, setAvailability] = useState(true);

  const [loader, setLoader] = useState(true);

  const router = useRouter();

  async function fetchData(_id) {
    try {
      const res = await fetch(`/api/user/displayorders/${_id}`);
      const data = await res.json();
      if (data.success) {
        setData(data.result);
        setAvailability(true);
      } else {
        setAvailability(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  }
  useEffect(() => {
    const restaurantJson = localStorage.getItem("restaurant");
    const parsedJson = restaurantJson && JSON.parse(restaurantJson);
    setRestaurant_id(parsedJson._id);

    fetchData(parsedJson._id);
  }, []);

  async function AcceptOrder(_id) {
    const res = await fetch(`/api/user/acceptorder`, {
      method: "PUT",
      body: JSON.stringify({ _id }),
    });
    const data = await res.json();
    if (data.success) {
      fetchData(restaurant_id);
    }
  }

  async function OrderReady(_id) {
    const res = await fetch(`/api/user/orderready`, {
      method: "PUT",
      body: JSON.stringify({ _id }),
    });
    const data = await res.json();
    if (data.success) {
      fetchData(restaurant_id);
    }
  }

  async function RejectOffer(_id) {
    const res = await fetch(`/api/user/rejectorder`, {
      method: "PUT",
      body: JSON.stringify({ _id }),
    });

    const data = await res.json();
    if (data.success) {
      fetchData(restaurant_id);
    }
  }

  const convertDate = (data) => {
    const date = new Date(data);
    const options = {
      hour: "2-digit", // "10 AM"
      minute: "2-digit", // "26"
    };

    const humanReadableDate = date.toLocaleString("en-US", options);
    return humanReadableDate;
  };

  const totalPrice = (array) => {
    const convertedPrices = array.map((item) => Number(item));
    const totalPrices = convertedPrices.reduce((sum, price) => sum + price, 0);
    return totalPrices;
  };

  const getQuantity = (array) => {
    const totalQuantity = array.reduce((sum, item) => sum + item, 0);
    return totalQuantity;
  };

  return (
    <>
      <section className="py-10 px-3">
        <h1 className="text-lg text-center font-semibold mb-2 text-gray-700">
          Available Orders
        </h1>
        <p className="text-gray-600 text-center">
          Below is the list of items ordered by costumers from your restaurant
        </p>

        {loader ? (
          <div className="mt-5">
            <Spinner />
          </div>
        ) : availability ? (
          <div className="relative overflow-x-auto mt-10 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 -center">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3 -center">
                    View Order
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => {
                    return (
                      <>
                        <tr
                          key={item._id}
                          className="odd:bg-white transition-all ease-in-out duration-300 hover:bg-gray-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {index + 1}
                          </th>
                          <td className="px-6 py-4">{item.status}</td>
                          <td className="px-6 py-4">
                            Rs{" "}
                            {totalPrice(item.items.map((item) => item.price))}
                          </td>
                          <td className="px-12 py-4">
                            {getQuantity(
                              item.items.map((item) => item.quantity)
                            )}
                          </td>
                          <td className="px-12 py-4">
                            {convertDate(item.createdAt)}
                          </td>
                          <td className="px-12 py-4">
                            <h1
                              onClick={() =>
                                router.push(`/user/restaurantfood/${item._id}`)
                              }
                              className="underline cursor-pointer"
                            >
                              View Order
                            </h1>
                          </td>

                          <td className="px-6 py-4 flex flex-col md:items-center md:justify-center gap-2 h-full">
                            {item.status === "pending" ? (
                              <>
                                <button
                                  onClick={() => AcceptOrder(item._id)}
                                  className="text-blue-500 underline"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => RejectOffer(item._id)}
                                  className="text-red-500"
                                >
                                  Reject
                                </button>
                              </>
                            ) : item.status === "accepted" ? (
                              <button
                                onClick={() => OrderReady(item._id)}
                                className="text-blue-500 underline"
                              >
                                Ready?
                              </button>
                            ) : (
                              <p>Waiting for delivery</p>
                            )}
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center font-semibold mt-10">
            Sorry no orders available at the moment
          </p>
        )}
      </section>
    </>
  );
}
