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
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password length should not be less than 6"),
});

export default function SignUp() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    const deliveryBoy = localStorage.getItem("deliveryboy");
    if (deliveryBoy) {
      router.push("/deliveryboy/dashboard");
    }
  });

  const [msg, setMsg] = useState();

  const dialogRef = useRef(null);

  const [loader, setLoader] = useState(false);

  async function onSubmit(values) {
    setLoader(true);
    try {
      const res = await fetch("/api/deliveryboy/deliveryboylogin", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        const { result } = data;
        delete result.password;
        localStorage.setItem("deliveryboy", JSON.stringify(result));
        setMsg(data.message);
        dialogRef.current?.click();
      } else {
        setMsg(data.message);
        dialogRef.current?.click();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }

  return (
    <>
      <section className="w-full py-20 bg-[#f8f8f8] px-5 lg:px-20 justify-center">
        <section className="shadow-xl w-full flex flex-col lg:flex-row-reverse">
          <div className="min-h-[400px] lg:h-auto h-full border text-white text-center bg-blue-500 flex flex-col items-center justify-center w-full px-5 gap-2">
            <h1 className="font-bold text-3xl">Welcome to login page</h1>
            <p className="font-semibold">Not have an account?</p>
            <button
              onClick={() => router.push("/deliveryboy/deliverysignup")}
              className="border px-5 py-2 rounded-full hover:bg-white hover:text-blue-500 font-semibold transition-all ease-in-out duration-300"
            >
              SignUp
            </button>
          </div>
          <div className="w-full bg-white min-h-[400px] border py-10 px-6">
            <h1 className="text-xl font-semibold text-gray-700 mb-5">Login</h1>
            <Form {...form}>
              <form
                className="mx-auto flex flex-col gap-5  rounded-xl py-5 "
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                          type="password"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div>
                  {loader ? (
                    <Button className="w-full cursor-not-allowed bg-white rounded-full py-6 border-blue-600 border shadow-none text-blue-600">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button
                      className="w-full text-white bg-blue-500 rounded-full py-6 hover:bg-blue-600"
                      type="submit"
                    >
                      Login
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </section>
      </section>

      <AlertDialog>
        <AlertDialogTrigger
          ref={dialogRef}
          className="hidden"
        ></AlertDialogTrigger>
        <AlertDialogContent className="bg-white w-[90%]">
          <AlertDialogHeader>
            <AlertDialogDescription>{msg}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {msg === "No user found with this credentials, please try again" ? (
              <AlertDialogCancel>Continue</AlertDialogCancel>
            ) : (
              <AlertDialogCancel
                onClick={() => router.push("/deliveryboy/dashboard")}
              >
                Continue
              </AlertDialogCancel>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
