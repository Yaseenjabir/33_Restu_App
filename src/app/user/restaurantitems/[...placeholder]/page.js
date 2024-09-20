"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Spinner from "../../../../../components/main/home/spinner";
import { useToast } from "@/components/ui/use-toast";
import SmallSpinner from "../../../../../components/main/home/smallSpinner";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SideCart from "../../../../../components/main/cart/sideCart";
import CartLogo from "../../../../../components/main/cart/cartLogo";

export default function Page({ params }) {
  const [data, setData] = useState([]);

  console.log(params);

  const router = useRouter();

  const [costumerId, setCostumerId] = useState();

  useEffect(() => {
    const costumerJson = localStorage.getItem("costumer");

    const costumerId = costumerJson && JSON.parse(costumerJson)._id;
    setCostumerId(costumerId);
  }, []);

  const { toast } = useToast();
  const [cartLoader, setCartLoader] = useState({});

  const id = params.placeholder[0];

  const restaurantName =
    params.placeholder[1] && params.placeholder[1].replace(/-/g, " ");

  const [loader, setLoader] = useState(false);
  const [availbility, setAvailbility] = useState(true);

  const alertRef = useRef();

  const addToCart = async (input) => {
    if (costumerId) {
      setCartLoader((prevState) => ({ ...prevState, [input.foodId]: true }));
      try {
        const res = await fetch("/api/orders/addorder", {
          method: "POST",
          body: JSON.stringify(input),
        });
        const data = await res.json();
        if (data.success) {
          toast({
            description: data.message,
          });
        } else {
          toast({
            description: data.message,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCartLoader((prevState) => ({ ...prevState, [input.foodId]: false }));
      }
    } else {
      alertRef.current?.click();
    }
  };

  const fetchData = async (id) => {
    setLoader(true);
    try {
      const response = await fetch(`/api/user/getsinglerestaurantitems/${id}`);
      const data = await response.json();
      if (data.success) {
        setData(data.foodItems);
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
    fetchData(id);
  }, []);

  const pathName = usePathname();

  const truncateDescription = (description) => {
    const maxLength = 80;
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <>
      <section className="w-full py-10 px-5 ">
        <div className="max-w-[760px] mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link className="text-[15px] md:text-[17px]" href="/">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link
                    className="text-[15px] md:text-[17px]"
                    href="/components"
                  >
                    {restaurantName}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-3 my-10 mx-2 py-5 px-2">
          {loader ? (
            <Spinner />
          ) : availbility ? (
            data &&
            data.map((item) => {
              return (
                <>
                  <div className="w-[250px] border rounded flex flex-col max-h-[400px]">
                    <Image
                      className="rounded"
                      width={250}
                      height={250}
                      src={item.imageUrl}
                    />
                    <div className="w-full text-center py-2 px-2 text-lg flex flex-col justify-start items-center flex-1 text-gray-700">
                      <h1 className="font-semibold break-words text-xl text-black my-3">
                        Name : {item.foodName}
                      </h1>
                      <h1 className="w-full break-words text-sm">
                        <span className="font-semibold">Price : </span>
                        {item.price}
                      </h1>
                      <h1 className="w-full break-words text-sm">
                        <span className="font-semibold">Description : </span>{" "}
                        {truncateDescription(item.description)}
                      </h1>
                      {cartLoader[item._id] ? (
                        <SmallSpinner />
                      ) : (
                        <button
                          onClick={() =>
                            addToCart({
                              restaurantId: id,
                              foodId: item._id,
                              costumerId,
                              name: item.foodName,
                              price: item.price,
                              quantity: 1,
                              image: item.imageUrl,
                            })
                          }
                          className="bg-green-500 text-white py-1 rounded w-[70%] my-3"
                        >
                          Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <p>No data available for this Restaurant</p>
          )}
        </div>
        <AlertDialog>
          <AlertDialogTrigger ref={alertRef} className="hidden">
            Open
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white w-[90%]">
            <AlertDialogHeader>
              <AlertDialogTitle>You are not login</AlertDialogTitle>
              <AlertDialogDescription>
                Please login to order item
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  router.push(
                    `/costumer/costumerauth?name=cart&route=${pathName}`
                  )
                }
              >
                Login
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <SideCart />
        <CartLogo />
      </section>
    </>
  );
}
