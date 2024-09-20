"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    emailAddress: z.string().email(),
    name: z.string().min(6),
    location: z.string().min(6),
    city: z.enum(cities),

    phone: z.string().min(11),
    password: z
      .string()
      .min(6, "Password length should be more than 6 characters"),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Password do not match",
      path: ["confirmPassword"],
    }
  );

const CostumerSignup = ({ setIsLogin }) => {
  const [spinner, setSpinner] = useState(false);

  const dialogRef = useRef();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
    },
  });

  const [message, setMessage] = useState();

  const handleSubmit = async (values) => {
    setSpinner(true);
    delete values.confirmPassword;
    const response = await fetch("/api/costumer/costumersignup", {
      method: "POST",
      body: JSON.stringify({
        emailAddress: values.emailAddress,
        city: values.city,
        name: values.name,
        location: values.location,
        phone: values.phone,
        password: values.password,
      }),
    });
    const data = await response.json();
    setSpinner(false);
    if (data.success) {
      const { result } = data;
      delete result.password;
      localStorage.setItem("costumer", JSON.stringify(result));
      setMessage(data.message);
      dialogRef.current?.click();
    } else {
      dialogRef.current?.click();
      setMessage(data.message);
    }
    setSpinner(false);
  };

  return (
    <>
      <section className="w-full py-20 bg-[#f8f8f8] px-5 lg:px-20 justify-center">
        <section className="shadow-xl w-full flex flex-col lg:flex-row-reverse">
          <div className="min-h-[400px] lg:h-auto h-full border text-white text-center bg-blue-500 flex flex-col items-center justify-center w-full px-5 gap-2">
            <h1 className="font-bold text-3xl">Welcome to signup page</h1>
            <p className="font-semibold">Already having an account?</p>
            <button
              onClick={() => setIsLogin((prev) => !prev)}
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
                className="mx-auto flex flex-col gap-5  rounded-xl py-5 "
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-gray-700">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                            placeholder="Enter Address"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-gray-700">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                            placeholder="Enter Name"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
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
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-gray-700">
                          Location
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                            placeholder="Enter Location"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-gray-700">
                          Contact No
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                            placeholder="Contact No"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-gray-700">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                            placeholder="Enter password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-gray-700">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-full placeholder:text-gray-400 focus:border-black border-gray-400 text-black py-6 focus:text-black bg-gray-100  font-semibold"
                            placeholder="Confirm Password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {spinner ? (
                  <Button disabled>
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
        <AlertDialogTrigger className="hidden" ref={dialogRef}>
          Open
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white w-[90%] rounded">
          <AlertDialogHeader>
            <AlertDialogTitle>{message}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {message === "You're account has been created, please login now" ? (
              <AlertDialogCancel onClick={() => setIsLogin((prev) => !prev)}>
                Tap to login
              </AlertDialogCancel>
            ) : (
              <AlertDialogCancel>Tap to continue</AlertDialogCancel>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CostumerSignup;
