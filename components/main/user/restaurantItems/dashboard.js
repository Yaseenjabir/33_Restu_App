"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Spinner from "../../home/spinner";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function RestaurantDashboard() {
  const [data, setData] = useState([]);

  const [loader, setLoader] = useState(true);

  const [id, setId] = useState();

  const [availibility, setAvailibility] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const restaurantJson = localStorage.getItem("restaurant");
    const parsed = restaurantJson && JSON.parse(restaurantJson);
    setId(parsed._id);
    async function fetchData(_id) {
      try {
        const res = await fetch(`/api/user/getFoodList/${_id}`, {
          signal,
        });

        const data = await res.json();
        if (data.success) {
          setAvailibility(true);
          setData(data.result);
        } else {
          setAvailibility(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
    fetchData(id);

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleDelete = async (_id) => {
    const res = await fetch("/api/user/deletefooditem", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
    });
    const data = await res.json();
    if (data.success) {
      setId((prev) => (prev === id ? null : prev));
    }
  };

  async function handleChange(query) {
    try {
      setLoader(true);
      const res = await fetch(`/api/user/searchbyname/${id}/${query}`);
      const data = await res.json();
      if (data.success) {
        setAvailibility(true);
        setData(data.result);
      } else {
        setData([]);
        setAvailibility(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }

  return (
    <>
      <section className="w-full min-h-[100vh] py-5 px-10 bg-[#fafafa]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex max-w-max border items-center bg-blue-500 pr-3 rounded-full"
        >
          <input
            onChange={(e) => handleChange(e.target.value)}
            type="text"
            placeholder="Search for food..."
            className="text-sm py-2 px-3 text-white bg-blue-500 font-semibold rounded-full outline-none placeholder:text-white "
          />
          <button type="submit">
            <FaSearch className="text-white h-[36px] cursor-pointer" />
          </button>
        </form>
        <h1 className="text-gray-600 text-sm font-bold mt-10 pl-2">
          Food you have added recently
        </h1>
        <section className="mt-5 flex items-center justify-center lg:justify-start flex-wrap gap-x-3 gap-y-7">
          {loader ? (
            <div className="mx-auto flex max-w-min">
              <Spinner />
            </div>
          ) : !availibility ? (
            <p>No item available</p>
          ) : (
            data &&
            data.map((item) => {
              return (
                <>
                  <div key={item._id} className="w-[200px]">
                    <Image
                      alt="foodImg"
                      src={item.imageUrl}
                      height={120}
                      width={200}
                      className="w-full rounded-t-[5px] max-w-[200px] max-h-[120px]"
                    />
                    <div className="border rounded-b-[5px] py-2 px-2 bg-white">
                      <h1 className="font-bold text-gray-700">
                        {item.foodName}
                      </h1>
                      <h1 className="font-semibold text-sm">Rs {item.price}</h1>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="border px-3 rounded-xl mt-2 text-sm bg-red-500 text-white flex items-center gap-1"
                      >
                        <RiDeleteBin6Line />
                        <h1>Delete</h1>
                      </button>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </section>
      </section>
    </>
  );
}
