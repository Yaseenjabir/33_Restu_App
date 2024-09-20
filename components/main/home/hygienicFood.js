import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
});

export default function Hygienic() {
  return (
    <>
      <h1
        style={{ fontFamily: poppins.style.fontFamily }}
        className="px-5 text-2xl font-semibold mb-5 mt-10 max-w-[1000px] mx-auto"
      >
        Eat hygienic food with us
      </h1>
      <section className="bg-blue-500 rounded-xl flex lg:flex-row flex-col gap-10 min-h-[400px] w-[95%] mx-auto lg:py-0 lg:px-0 lg:pl-5 max-w-[1000px]">
        <div className="text-center py-8 px-5 text-white flex flex-col lg:items-center lg:justify-center">
          <h1 className="font-semibold text-xl mb-4">
            Ensuring the Highest Standards of Food Safety and Cleanliness
          </h1>
          <p className="max-w-[600px] mx-auto">
            At our restaurant, your health and safety are our top priorities.
            Our commitment to hygienic food practices ensures that every meal
            you enjoy is prepared in a clean and safe environment
          </p>
        </div>
        <Image
          src={
            "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          width={300}
          height={300}
          alt=""
          className="w-full mx-auto rounded-b-[10px] lg:rounded-b-none"
        />
      </section>
    </>
  );
}
