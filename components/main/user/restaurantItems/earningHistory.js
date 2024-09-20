import { useEffect, useState } from "react";
import Spinner from "../../home/spinner";

export default function EarningHistory() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const [availablility, setAvailibility] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const restaurantJson = localStorage.getItem("restaurant");
        const restaurant = restaurantJson && JSON.parse(restaurantJson);

        const res = await fetch(`/api/user/earninghistory/${restaurant._id}`, {
          signal,
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setData(data.result);
          setAvailibility(true);
        } else {
          setAvailibility(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  const convertDate = (data) => {
    const date = new Date(data);
    const options = {
      weekday: "long", // "Monday"
      year: "numeric", // "2024"
      month: "long", // "August"
      day: "numeric", // "28"
    };

    const humanReadableDate = date.toLocaleString("en-US", options);
    return humanReadableDate;
  };

  const totalPrice = (array) => {
    const convertedPrices = array.map((item) => Number(item));
    const totalPrices = convertedPrices.reduce((sum, price) => sum + price, 0);
    return totalPrices;
  };

  const totalEarning = (data) => {
    if (data.length > 0 && Array.isArray(data)) {
      const maped = data.map((item) => item.items.map((item) => item.price));
      const again = maped.map((item) =>
        item.reduce((sum, item) => {
          const convertedPrices = Number(item);
          return sum + convertedPrices;
        }, 0)
      );
      const total = again.reduce((sum, item) => sum + item, 0);
      const formattedTotal = new Intl.NumberFormat().format(total);
      return formattedTotal;
    }
  };

  return (
    <>
      <section
        className={`w-full min-h-screen flex flex-col items-center py-10 px-5`}
      >
        {loader ? (
          <Spinner />
        ) : availablility ? (
          <>
            <table className="w-full text-left border-collapse max-w-[800px] bg-white rounded-xl shadow-lg mb-5">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b font-medium text-gray-700 border w-[33%]">
                    S.No
                  </th>
                  <th className="py-2 px-4 border-b font-medium text-gray-700 border w-[33%]">
                    Date
                  </th>
                  <th className="py-2 px-4 border-b font-medium text-gray-700 border w-[33%]">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">
                      {convertDate(item.createdAt)}
                    </td>
                    <td className="py-2 px-4 border ">
                      Rs {totalPrice(item.items.map((item) => item.price))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full max-w-[800px] bg-white rounded-xl py-4 px-4 flex justify-between items-center text-lg shadow-lg">
              <span>Total Earning</span>:
              <span className="font-semibold">Rs {totalEarning(data)}</span>
            </div>
          </>
        ) : (
          <p>No Earning History Available</p>
        )}
      </section>
    </>
  );
}
