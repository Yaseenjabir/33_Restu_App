"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function RestaurantListWrapper({ item }) {
  const router = useRouter();

  return (
    <>
      <div
        onClick={() =>
          router.push(
            `/user/restaurantitems/${item._id}/${item.name.replace(
              /\s+/g,
              "-"
            )}`
          )
        }
        className="w-[200px] md:w-[230px] border rounded flex flex-col hover:scale-105 transition-all duration-150 cursor-pointer relative h-[150px] md:h-[180px]"
      >
        <Image
          className="rounded h-full w-full"
          width={200}
          height={200}
          src={item.image}
        />
        <div className="absolute left-2 bottom-2 bg-white px-2 rounded-xl">
          {item.name}
        </div>
      </div>
    </>
  );
}
