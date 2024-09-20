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

import { ReloadIcon } from "@radix-ui/react-icons";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../home/spinner";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
  gender: z.enum(["male", "female"]),
  phone: z.string(),
  vehicalType: z.enum(["bike", "scooty", "cycle"]),
  address: z.string(),
  city: z.string(),
});

import { motion } from "framer-motion";

export default function MyProfile() {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const [dataLoading, setDataLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [deliveryBoy_id, setDeliveryBoy_id] = useState();

  const { reset } = form;

  const resetData = (result) => {
    reset({
      fullName: result.fullName,
      email: result.email,
      gender: result.gender,
      phone: result.phone,
      city: result.city,
      address: result.address,
      vehicalType: result.vehicalType,
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setDataLoading(true);
      try {
        const deliveryJson = localStorage.getItem("deliveryboy");
        const deliveryBoy = deliveryJson && JSON.parse(deliveryJson);
        setDeliveryBoy_id(deliveryBoy._id);
        const res = await fetch(
          `/api/deliveryboy/profileinfo/${deliveryBoy._id}`,
          { signal }
        );
        const data = await res.json();
        if (data.success) {
          const result = data.result;
          resetData(result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, [resetData]);

  async function onSubmit(values) {
    setLoading(true);
    try {
      const res = await fetch("/api/deliveryboy/updateprofile", {
        method: "PUT",
        body: JSON.stringify({ _id: deliveryBoy_id, ...values }),
      });

      const data = await res.json();
      if (data.success) {
        const result = data.result;
        resetData(result);
        toast({
          description: data.message,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.section
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ originX: 0.5, originY: 0.5 }}
        className="w-full min-h-screen py-10 flex flex-col items-center px-5"
      >
        <h1 className="text-center text-2xl font-semibold mb-5">My Profile</h1>
        <p className="mb-7 text-lg text-gray-700">
          Change info then click <strong>submit</strong> button
        </p>
        {dataLoading ? (
          <Spinner />
        ) : (
          <Form {...form}>
            <form
              className="space-y-2 bg-white w-full shadow-lg md:space-y-0 relative max-w-[800px] mx-5 border rounded-[10px] py-5 px-8 grid md:grid-cols-2 gap-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
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
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone" {...field} />
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
                    <FormLabel>Gender</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicel type" />
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
                    <FormControl>
                      <Input placeholder="Enter your city" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex items-center pt-7">
                {loading ? (
                  <Button className="w-full cursor-not-allowed border">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full border">
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </Form>
        )}
      </motion.section>
    </>
  );
}
