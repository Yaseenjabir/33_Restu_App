"use client";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
});
export default function HeroSection({
  setRestaurants,
  setLoader,
  setAvailbility,
}) {
  const [locations, setLocations] = useState([]);

  const getLocations = async () => {
    const response = await fetch(`/api/user/getlocations`);
    const data = await response.json();
    if (data.success) {
      setLocations(data.locations[0]);
    }
  };

  const getRestaurants = async (input) => {
    setLoader(true);
    try {
      let url = "/api/user/getrestaurants";
      if (input?.location) {
        url = `/api/user/getrestaurants?location=${input.location}`;
      } else if (input?.restaurant) {
        url = `/api/user/getrestaurants?restaurant=${input.restaurant}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setRestaurants(data.restaurants);
        setAvailbility(true);
      } else {
        setAvailbility(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getLocations();
    getRestaurants();
  }, []);

  return (
    <>
      <h1
        style={{ fontFamily: poppins.style.fontFamily }}
        className="mt-[280px] px-2 text-xl font-bold mb-8"
      >
        Search and find your favorite restaurant in your city
      </h1>
      <div
        id="heroSection"
        className="w-full h-[300px] border relative before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-[#000000a1] flex flex-col justify-center items-center"
      >
        <div className="relative w-full z-10 text-white px-2">
          <h1 className="text-5xl font-bold text-center mb-5">
            Search for resturants
          </h1>
          <div className="w-full flex gap-2 justify-center items-center max-w-[730px] mx-auto px-2">
            <select
              onChange={(e) => getRestaurants({ location: e.target.value })}
              className="text-black py-1 px-2 w-[25%] max-w-[125px] "
            >
              <option>All</option>
              {locations &&
                locations.map((item) => {
                  return (
                    <>
                      <option>{item}</option>
                    </>
                  );
                })}
            </select>
            <input
              onChange={(e) => getRestaurants({ restaurant: e.target.value })}
              type="text"
              className="w-[75%] py-1 rounded px-2 text-black outline-none"
              placeholder="enter restaurant name"
            />
          </div>
        </div>
      </div>
    </>
  );
}
