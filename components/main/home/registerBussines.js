import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
});

export default function RegisterBussiness() {
  return (
    <>
      <section className="mt-10">
        <h1
          style={{ fontFamily: poppins.style.fontFamily }}
          className="font-bold text-2xl px-4 md:px-8 md:text-3xl lg:px-12 xl:px-14 mb-5"
        >
          You prepare the food, we handle the rest
        </h1>
        <div
          id="chefBackground"
          className="w-full h-[70vh] relative flex justify-center md:justify-start"
        >
          <div className="bg-white rounded-xl py-4 px-5 shadow-2xl shadow-black text-black absolute bottom-[-150px] w-[95%] md:w-[430px] md:ml-8 lg:ml-12 xl:ml-20">
            <h1 className="font-semibold mb-8">
              List your restaurant or shop on EatsEase
            </h1>
            <p className="font-light leading-5 mb-5">
              Would you like millions of new customers to enjoy your amazing
              food and groceries? So would we!
            </p>
            <p className="font-light leading-5 mb-5">
              It's simple: we list your menu and product lists online, help you
              process orders, pick them up, and deliver them to hungry pandas –
              in a heartbeat!
            </p>
            <p className="mb-5">
              Interested? Let's start our partnership today!
            </p>
            <Link
              href="/user/userauth"
              className="bg-blue-500 px-3 py-2 rounded-xl font-semibold text-white"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
