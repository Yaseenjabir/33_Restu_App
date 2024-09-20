"use client";
import { useState } from "react";
import HeroSection from "../../components/main/home/heroSection";
import RestaurantList from "../../components/main/home/restaurantList";

export default function SectionWrapper() {
  const [resturants, setRestaurants] = useState([]);

  const [loader, setLoader] = useState(false);

  const [avaialbility, setAvailbility] = useState(true);

  return (
    <>
      <HeroSection
        setRestaurants={setRestaurants}
        setLoader={setLoader}
        setAvailbility={setAvailbility}
      />
      <RestaurantList
        loader={loader}
        resturants={resturants}
        avaialbility={avaialbility}
      />
    </>
  );
}
