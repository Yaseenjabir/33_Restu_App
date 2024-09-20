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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReloadIcon } from "@radix-ui/react-icons";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const cities = [
  "Bahawalpur",
  "Bannu",
  "Chakwal",
  "Chiniot",
  "Dera Ghazi Khan",
  "Dera Ismail Khan",
  "Faisalabad",
  "Gujranwala",
  "Gujrat",
  "Gwadar",
  "Haripur",
  "Hyderabad",
  "Islamabad",
  "Jacobabad",
  "Jhang",
  "Jhelum",
  "Jauharabad",
  "Kasur",
  "Khuzdar",
  "Kotli",
  "Lahore",
  "Larkana",
  "Mardan",
  "Mianwali",
  "Mirpur",
  "Multan",
  "Nowshera",
  "Okara",
  "Pakpattan",
  "Peshawar",
  "Pindi Bhattian",
  "Quetta",
  "Rajanpur",
  "Rawalpindi",
  "Risalpur",
  "Sahiwal",
  "Sargodha",
  "Sheikhupura",
  "Shikarpur",
  "Sialkot",
  "Sukkur",
  "Swat",
  "Tando Adam",
  "Tando Allahyar",
  "Toba Tek Singh",
  "Turbat",
  "Zhob",
];

const formSchema = z
  .object({
    fullName: z.string().min(2).max(50),
    email: z.string().email(),
    gender: z.enum(["male", "female"]),
    phone: z.string(),
    vehicalType: z.enum(["bike", "scooty", "cycle"]),
    password: z.string().min(6, "Password length should not be less than 6"),
    confirmPassword: z.string(),
    address: z.string(),
    city: z.enum(cities),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export default function Page() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dialogRef = useRef(null);

  const [msg, setMsg] = useState();

  useEffect(() => {
    const deliveryBoy = localStorage.getItem("deliveryboy");
    if (deliveryBoy) {
      router.push("/deliveryboy/dashboard");
    }
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      delete values.confirmPassword;
      const res = await fetch("/api/deliveryboy/deliveryboysignup", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.success) {
        setMsg(data.message);
        dialogRef.current?.click();
      } else {
        dialogRef.current?.click();
        setMsg(data.message);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="w-full py-20 bg-[#f8f8f8] px-5 lg:px-20 justify-center">
        <section className="shadow-xl w-full flex flex-col lg:flex-row-reverse">
          <div className="min-h-[400px] lg:h-auto h-full border text-white text-center bg-blue-500 flex flex-col items-center justify-center w-full px-5 gap-2">
            <h1 className="font-bold text-3xl">Welcome to signup page</h1>
            <p className="font-semibold">Already having an account?</p>
            <button
              onClick={() => router.push("/deliveryboy/deliverylogin")}
              className="border px-5 py-2 rounded-full hover:bg-white hover:text-blue-500 font-semibold transition-all ease-in-out duration-300"
            >
              Login
            </button>
          </div>
          <div className="w-full bg-white min-h-[400px] border py-10 px-6">
            <h1 className="text-xl font-semibold text-gray-700 mb-5">
              Sign up
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto flex flex-col gap-5  rounded-xl py-5 "
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                          placeholder="Enter your phone"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">
                        Gender
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold">
                            <SelectValue placeholder="Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehicalType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="rounded-full focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold">
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          <SelectItem value="bike">Bike</SelectItem>
                          <SelectItem value="scooty">Scooty</SelectItem>
                          <SelectItem value="cycle">Cycle</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="rounded-full focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          {cities.map((item) => (
                            <SelectItem value={item}>{item}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                          placeholder="Enter your address"
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
                          type="password"
                          className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-700">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="flex items-end md:h-[68px]">
                  {loading ? (
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
            {msg === "User signed up successfully" ? (
              <AlertDialogCancel
                onClick={() => router.push("/deliveryboy/deliverylogin")}
              >
                Continue
              </AlertDialogCancel>
            ) : (
              <AlertDialogCancel>Continue</AlertDialogCancel>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
