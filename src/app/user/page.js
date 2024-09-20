"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Spinner from "../../../components/main/home/spinner";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const restaurant = localStorage.getItem("restaurant");

  const restaurant_id = restaurant && JSON.parse(restaurant)._id;
  const { toast } = useToast();
  const [loader, setLoader] = useState(false);

  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function fetchData(id) {
    setLoader(true);
    try {
      const response = await fetch(`/api/user/userinfo/${id}`);
      const data = await response.json();
      if (data.success) {
        setName(data.result.name);
        setLocation(data.result.location);
        setContact(data.result.contact);
        setEmail(data.result.email);
        setPassword(data.result.password);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }

  const handleUpdate = async (input) => {
    for (let keys in input) {
      if (!input[keys]) {
        alert("Please fill the input");
        return;
      }
    }
    setLoader(true);
    const response = await fetch(`/api/user/updaterestaurantdata`, {
      method: "PUT",
      body: JSON.stringify({
        id: restaurant_id,
        input,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      const { result } = data;
      delete result.password;
      localStorage.setItem("restaurant", JSON.stringify(result));
      fetchData(restaurant_id);
      toast({
        description: "✔️ Data Updated Successfully",
      });
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchData(restaurant_id);
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (!restaurant_id) {
      router.push("/user/userauth");
    }
  }, []);

  return (
    <>
      <section className="w-full py-32 px-5">
        <h1 className="text-3xl text-center">Restaurant Info</h1>
        <div className="w-full py-5 gap-2 flex flex-col items-center justify-center">
          {loader ? (
            <Spinner />
          ) : (
            <>
              <div className="text-xl max-w-[550px] w-full flex border items-center justify-center gap-2 p-2">
                <h1 className="text-black">Name:</h1>
                <Input
                  value={name}
                  placeholder="Enter name"
                  className="rounded"
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  onClick={() => handleUpdate({ name })}
                  className="px-3 py-1 text-base rounded-xl mx-3 bg-green-500 text-white"
                >
                  Update
                </button>
              </div>

              <div className="text-xl max-w-[550px] w-full flex border items-center justify-center gap-2 p-2">
                <h1 className="text-black">Location:</h1>
                <Input
                  value={location}
                  placeholder="Enter name"
                  className="rounded"
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                  onClick={() => handleUpdate({ location })}
                  className="px-3 py-1 text-base rounded-xl mx-3 bg-green-500 text-white"
                >
                  Update
                </button>
              </div>
              <div className="text-xl max-w-[550px] w-full flex border items-center justify-center gap-2 p-2">
                <h1 className="text-black">Contact:</h1>
                <Input
                  value={contact}
                  placeholder="Enter name"
                  className="rounded"
                  onChange={(e) => setContact(e.target.value)}
                />
                <button
                  onClick={() => handleUpdate({ contact })}
                  className="px-3 py-1 text-base rounded-xl mx-3 bg-green-500 text-white"
                >
                  Update
                </button>
              </div>

              <div className="text-xl max-w-[550px] w-full flex border items-center justify-center gap-2 p-2">
                <h1 className="text-black">Email:</h1>
                <Input
                  value={email}
                  placeholder="Enter name"
                  className="rounded"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={() => handleUpdate({ email })}
                  className="px-3 py-1 text-base rounded-xl mx-3 bg-green-500 text-white"
                >
                  Update
                </button>
              </div>

              <div className="text-xl max-w-[550px] w-full flex border items-center justify-center gap-2 p-2">
                <h1 className="text-black">Password:</h1>
                <Input
                  value={password}
                  placeholder="Enter name"
                  className="rounded"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={() => handleUpdate({ password })}
                  className="px-3 py-1 text-base rounded-xl mx-3 bg-green-500 text-white"
                >
                  Update
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
