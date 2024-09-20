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
import { useRef, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { increment } from "../../../redux/slices/forceRender";
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
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(5),
});
export default function CostumerLogin({ setIsLogin }) {
  const [spinner, setSpinner] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const routeName = searchParams.get("name");
  const redirectionPath = searchParams.get("route");

  const dialogRef = useRef();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
    },
  });

  const [message, setMessage] = useState();

  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    setSpinner(true);
    const response = await fetch(`/api/costumer/costumerlogin`, {
      method: "POST",
      body: JSON.stringify({
        emailAddress: values.emailAddress,
        password: values.password,
      }),
    });

    console.log(response);

    const data = await response.json();

    if (data.success) {
      const { user } = data;
      delete user.password;
      localStorage.setItem("costumer", JSON.stringify(user));
      dispatch(increment());
      setMessage(data.message);
      dialogRef.current?.click();
    } else {
      dialogRef.current?.click();
      setMessage(data.message);
    }
    setSpinner(false);
  };

  function handleRouting() {
    if (routeName === "cart") {
      router.push(redirectionPath);
    } else {
      router.push("/");
    }
  }

  return (
    <>
      <section className="w-full py-20 bg-[#f8f8f8] px-5 lg:px-20 justify-center">
        <section className="shadow-xl w-full flex flex-col lg:flex-row-reverse">
          <div className="min-h-[400px] lg:min-h-[422px] h-full border text-white text-center bg-blue-500 flex flex-col items-center justify-center w-full px-5 gap-2">
            <h1 className="font-bold text-3xl">Welcome to login page</h1>
            <p className="font-semibold">Don&apos;t have an account?</p>
            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className="border px-5 py-2 rounded-full hover:bg-white hover:text-blue-500 font-semibold transition-all ease-in-out duration-300"
            >
              Signup
            </button>
          </div>
          <div className="w-full bg-white min-h-[400px] border py-10 px-6">
            <h1 className="text-xl font-semibold text-gray-700 mb-5">Signin</h1>
            <Form {...form}>
              <form
                className="mx-auto flex flex-col gap-5  rounded-xl py-5 "
                onSubmit={form.handleSubmit(handleLogin)}
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
                            placeholder="Enter Passord"
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
            {message === "You are now logged in" ? (
              <AlertDialogCancel onClick={handleRouting}>
                Tap to continue
              </AlertDialogCancel>
            ) : (
              <AlertDialogCancel>Tap to continue</AlertDialogCancel>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
