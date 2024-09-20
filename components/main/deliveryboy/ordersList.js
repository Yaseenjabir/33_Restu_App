import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../home/spinner";

import { motion } from "framer-motion";

export default function OrderList() {
  const [data, setData] = useState([]);

  const router = useRouter();

  const [availablility, setAvailibility] = useState(false);
  const [availablility2, setAvailibility2] = useState(false);

  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);

  const [showMsg, setShowMsg] = useState(false);
  const [showMsg2, setShowMsg2] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);

  const [deliveryboyData, setDeliveryBoyData] = useState([]);
  const convertDate = (data) => {
    const date = new Date(data);
    const options = {
      weekday: "long", // "Monday"
      year: "numeric", // "2024"
      month: "long", // "August"
      day: "numeric", // "28"
      hour: "2-digit", // "10 AM"
      minute: "2-digit", // "26"
      second: "2-digit", // "05"
      timeZoneName: "short", // "GMT"
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

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchData() {
      setLoader(true);
      try {
        const deliveryJson = localStorage.getItem("deliveryboy");
        const deliveryboy = deliveryJson && JSON.parse(deliveryJson);
        const deliveryboyCity = deliveryboy.city;
        const res = await fetch("/api/deliveryboy/getorder", {
          method: "POST",
          body: JSON.stringify({ city: deliveryboyCity, status: "ready" }),
          signal,
        });

        const data = await res.json();
        console.log(data);
        if (data.success) {
          setData(data.result);
          setAvailibility(true);
          setShowMsg(false);
        } else {
          setShowMsg(true);
          setAvailibility(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (isCompleted) {
      const fetchData = async () => {
        setLoader2(true);
        try {
          const deliveryJson = localStorage.getItem("deliveryboy");
          const deliveryboy = deliveryJson && JSON.parse(deliveryJson);
          setLoader2(true);
          const res = await fetch(
            `/api/deliveryboy/getdeliverieshistory/${deliveryboy._id}`,
            { signal }
          );
          const data = await res.json();
          if (data.success) {
            setAvailibility2(true);
            setDeliveryBoyData(data.result);
            setShowMsg2(false);
          } else {
            showMsg2(true);
            setAvailibility2(false);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoader2(false);
        }
      };
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [isCompleted, showMsg2]);

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ originX: 0.5, originY: 0.5 }}
    >
      <Tabs
        className="w-full h-screen px-5 flex flex-col items-center justify-start py-10"
        defaultValue="all"
      >
        <TabsList className="flex items-center bg-white px-10 rounded py-5">
          <TabsTrigger value="all" onClick={() => setIsCompleted(false)}>
            Available
          </TabsTrigger>
          <TabsTrigger value="completed" onClick={() => setIsCompleted(true)}>
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="all"
          className="max-w-[800px] w-full bg-white shadow-lg rounded-[10px]"
        >
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                Below is the list of available order, please pick any
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] sm:table-cell">
                      S.No
                    </TableHead>
                    <TableHead>Restaurant Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total Quantity
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availablility &&
                    data.map((item, index) => {
                      return (
                        <>
                          <TableRow
                            onClick={() =>
                              router.push(`/deliveryboy/dashboard/${item._id}`)
                            }
                            className="hover:bg-slate-100 cursor-pointer transition-all ease-in-out duration-200"
                          >
                            <TableCell className="hidden sm:table-cell">
                              {index + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              {item.restaurant.name}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.status}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              RS.
                              {totalPrice(item.items.map((item) => item.price))}
                            </TableCell>
                            <TableCell className="hidden text-center md:table-cell">
                              {getQuantity(
                                item.items.map((item) => item.quantity)
                              )}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {convertDate(item.createdAt)}
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
              <div className="mt-4">{loader && <Spinner />}</div>
              {showMsg && !loader && (
                <p className="text-center mt-4 text- font-semibold">
                  No order available currently in your area
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent
          value="completed"
          className="max-w-[800px] bg-white rounded-[10px] shadow-lg w-full"
        >
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                Below is the list of the orders you completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S.No</TableHead>
                    <TableHead>Restaurant Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total Quantity
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                {availablility2 &&
                  deliveryboyData.map((item, index) => {
                    return (
                      <>
                        <TableBody>
                          <TableRow className="hover:bg-slate-100 cursor-pointer transition-all ease-in-out duration-200">
                            <TableCell className="table-cell">
                              {index + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              {item.restaurant.name}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.status}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              RS.
                              {totalPrice(item.items.map((item) => item.price))}
                            </TableCell>
                            <TableCell className="hidden text-center md:table-cell">
                              {getQuantity(
                                item.items.map((item) => item.quantity)
                              )}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {convertDate(item.createdAt)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </>
                    );
                  })}
              </Table>
              {loader2 && !availablility2 && (
                <div className="mt-5 flex items-center justify-center w-full">
                  <Spinner />
                </div>
              )}
              {!loader2 && showMsg2 && (
                <p className="w-full font-semibold text-center">
                  No order history available
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
