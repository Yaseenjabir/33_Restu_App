"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "../../../../firebase/firebase";
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
import { nanoid } from "@reduxjs/toolkit";

const formSchema = z.object({
  foodName: z.string().min(5),
  price: z.string().min(3),
  description: z.string(),
});

export default function AddItem({ setAddItem }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [msg, setMsg] = useState();

  const [loader, setLoader] = useState(false);

  const [file, setFile] = useState();

  const dialogRef = useRef(null);

  const [fileSelected, setFileSelected] = useState();

  const handleSubmit = async (val) => {
    setLoader(true);

    try {
      if (!file) {
        alert("Please select pic");
        return;
      }
      const storage = getStorage(app);
      const imgRef = storageRef(storage, `images/${nanoid()}`);
      await uploadBytes(imgRef, file);
      const imageUrl = await getDownloadURL(imgRef);

      const newVal = { ...val, imageUrl };
      const restaurant_id = JSON.parse(localStorage.getItem("restaurant"))._id;

      const response = await fetch("/api/user/addfood", {
        method: "POST",
        body: JSON.stringify({ ...newVal, restaurant_id }),
      });
      const data = await response.json();
      if (data.success) {
        setMsg(data.message);
        dialogRef.current?.click();
      } else {
        setMsg(data.message);
        dialogRef.current?.click();
      }
      deleteFile();
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (!file) return;

    const uploadFile = async () => {
      const storage = getStorage(app);
      const imgRef = storageRef(storage, `placeholder/placeholder`);

      try {
        await uploadBytes(imgRef, file, { contentType: file.type });
        const imageUrl = await getDownloadURL(imgRef);
        setFileSelected(imageUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };

    uploadFile();
  }, [file]);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function deleteFile() {
    const storage = getStorage(app);
    const fileRef = storageRef(storage, `placeholder/placeholder`);

    try {
      await deleteObject(fileRef);
      console.log("Deleted");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }

  return (
    <>
      <section className="w-full py-10 px-5">
        <section className="w-full flex flex-col lg:flex-row min-h-5 shadow-lg shadow-[#8f8f8f]">
          <div className="h-[400px] bg-blue-500 flex flex-col items-center px-3 text-white justify-center lg:w-[50%] lg:h-auto">
            <h1 className="text-3xl font-bold ">Add your items here</h1>
            <h1 className="font-semibold mt-3">Already having items?</h1>
            <button className="py-2 px-3 rounded-full border-white border mt-5 font-semibold hover:bg-white hover:text-blue-500 transition-all ease-in-out duration-300">
              See Items
            </button>
          </div>
          <div className="w-full items-center justify-center lg:w-[50%] lg:pt-10">
            <Image
              alt="food Image"
              width={300}
              height={300}
              src={
                fileSelected
                  ? fileSelected
                  : "https://luigispizzakenosha.com/wp-content/uploads/placeholder.png"
              }
              className="w-full max-w-[400px] lg:w-full mx-auto"
            />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-2 w-full pb-10 px-5"
              >
                <h1 className="mt-5 mb-7 font-bold text-xl text-blue-500">
                  Enter food details
                </h1>
                <FormField
                  control={form.control}
                  name="foodName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 font-semibold">
                        Enter Item Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                          placeholder="Item Name"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500">
                        Enter Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                          placeholder="Price"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                          placeholder="Item Name"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid w-full items-center gap-1.5">
                  <Label className="text-gray-500" htmlFor="picture">
                    Picture
                  </Label>
                  <Input
                    onChange={handleFileChange}
                    id="picture"
                    type="file"
                    className="rounded-full w-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black  focus:text-black bg-gray-100  font-semibold"
                  />
                </div>
                {loader ? (
                  <Button className="w-full cursor-not-allowed bg-white rounded-full py-6 border-blue-600 border shadow-none text-blue-600">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full text-white bg-blue-500 rounded-full py-6 hover:bg-blue-600"
                  >
                    Submit
                  </Button>
                )}
              </form>
            </Form>
          </div>
        </section>
      </section>
      <AlertDialog>
        <AlertDialogTrigger ref={dialogRef} className="hidden">
          Open
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white w-[95%]">
          <AlertDialogHeader>
            <AlertDialogTitle>{msg}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => location.reload()}>
              Continue
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
