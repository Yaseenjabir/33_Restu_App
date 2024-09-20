"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function ItemList() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDesc] = useState("");

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [resto_id, setResto_id] = useState(null);

  const { toast } = useToast();
  const fetchData = async () => {
    const response = await fetch(`/api/user/getFoodList/${resto_id}`);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setData(data.result);
    }
  };

  const handleUpdate = async (id) => {
    const response = await fetch(`/api/user/updatefoodlist/${id}`);
    const data = await response.json();
    if (data.success) {
      setName(data.result.foodName);
      setPrice(data.result.price);
      setImage(data.result.imageUrl);
      setDesc(data.result.description);
    }
  };

  const dailogRef = useRef(null);

  const handleSubmitUpdate = async (_id) => {
    setLoader(true);
    try {
      const response = await fetch(`/api/user/updatesinglefood`, {
        method: "PUT",
        body: JSON.stringify({ _id, name, price, image, description }),
      });
      const data = await response.json();
      if (data.success) {
        fetchData();
        dailogRef.current.click();
        toast({
          title: "Item Updated",
          description: "The item has been updated successfully",
        });
      } else {
        toast({
          title: "Failed Item Update",
          description: "Failed to update the item, please try again",
        });
      }
    } catch (error) {
      console.log("the Erorr is:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`/api/user/deletefooditem`, {
        method: "DELETE",
        body: JSON.stringify({ _id }),
      });

      const data = await response.json();
      if (data.success) {
        fetchData();
      } else {
        toast({
          title: "Failed Deletetion",
          description: data.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedResto = localStorage.getItem("restaurant");
      if (storedResto) {
        const parsed = JSON.parse(storedResto);
        setResto_id(parsed._id);
      }
    }
  }, []);
  useEffect(() => {
    if (resto_id) {
      fetchData();
    }
  }, [resto_id, fetchData]);

  if (resto_id === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={{ minHeight: "calc(100vh - 180px)" }}>
        <h1 className="text-center text-3xl mb-5">Item List</h1>
        <div className="container mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    S. No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Manage
                  </th>
                </tr>
              </thead>
              {data && data.length > 0 ? (
                data.map((item, index) => {
                  return (
                    <tbody
                      key={index}
                      className="bg-white divide-y divide-gray-200"
                    >
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.foodName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Image
                            alt=""
                            src={item.imageUrl}
                            width={70}
                            height={70}
                          />
                        </td>
                        <td className="px-6 py-4 flex gap-2 whitespace-nowrap text-sm text-gray-500">
                          <Dialog>
                            <DialogTrigger
                              ref={dailogRef}
                              onClick={() => handleUpdate(item._id)}
                              className="text-green-400 duration-150 transition-all  hover:text-green-500 font-bold"
                            >
                              Update
                            </DialogTrigger>
                            <DialogContent className="bg-black rounded-xl">
                              <DialogHeader>
                                <DialogTitle>Update Data</DialogTitle>
                              </DialogHeader>
                              <div className="flex flex-col gap-3">
                                <div className="w-full flex flex-col justify-between items-center sm:flex-row">
                                  <Label
                                    htmlFor="itemName"
                                    className="text-white text-base"
                                  >
                                    Name
                                  </Label>
                                  <Input
                                    value={name && name}
                                    id="itemName"
                                    className="bg-white w-[78%] rounded-xl"
                                    placeholder="Item Name"
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </div>
                                <div className="w-full flex flex-col justify-between items-center sm:flex-row">
                                  <Label
                                    htmlFor="price"
                                    className="text-white text-base"
                                  >
                                    Price
                                  </Label>
                                  <Input
                                    value={price && price}
                                    id="price"
                                    className="bg-white w-[78%] rounded-xl"
                                    placeholder="Item Price"
                                    onChange={(e) => setPrice(e.target.value)}
                                  />
                                </div>
                                <div className="w-full flex flex-col justify-between items-center sm:flex-row">
                                  <Label
                                    htmlFor="image"
                                    className="text-white text-base rounded-xl"
                                  >
                                    Image
                                  </Label>
                                  <Input
                                    value={image && image}
                                    id="image"
                                    className="bg-white w-[78%] rounded-xl"
                                    placeholder="Item Image"
                                    onChange={(e) => setImage(e.target.value)}
                                  />
                                </div>
                                <div className="w-full flex flex-col justify-between items-center sm:flex-row">
                                  <Label
                                    htmlFor="description"
                                    className="text-white text-base"
                                  >
                                    Description
                                  </Label>
                                  <Textarea
                                    value={description && description}
                                    id="description"
                                    className="bg-white w-[78%] rounded-xl"
                                    placeholder="Enter Your Description"
                                    onChange={(e) => setDesc(e.target.value)}
                                  />
                                </div>
                                {loader ? (
                                  <Button
                                    disabled
                                    className="bg-black text-white border border-white rounded-xl py-2 w-[60%] sm:self-end sm:mr-14 hover:bg-white hover:text-black mx-auto transition-all duration-200"
                                  >
                                    <ReloadIcon className="mr-2 h-5 w-4 animate-spin" />
                                    Please wait
                                  </Button>
                                ) : (
                                  <button
                                    onClick={() => handleSubmitUpdate(item._id)}
                                    className="bg-black text-white border border-white rounded-xl py-2 w-[60%] sm:self-end sm:mr-14 hover:bg-white hover:text-black mx-auto transition-all duration-200"
                                  >
                                    Update
                                  </button>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-400 duration-150 transition-all  hover:text-red-500 font-bold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              ) : (
                <p>No data available</p>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
