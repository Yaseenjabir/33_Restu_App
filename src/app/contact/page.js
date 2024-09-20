import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
export default function Page() {
  return (
    <>
      <div
        id="contactPage"
        className="h-[400px] flex items-center justify-center relative md:h-[350px] bg-left lg:h-[400px] w-full before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#00000091] flex-col"
      >
        <Breadcrumb>
          <BreadcrumbList className="text-white z-10 relative">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/contact">Contact</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-white font-bold relative mt-2">Contact Us</h1>
      </div>
      <section className="w-full py-20 text-center bg-gray-50 px-5 flex flex-col items-center justify-center">
        <h1 className="font-semibold text-2xl">Contact Us</h1>
        <p className="mt-5 max-w-[450px]">
          We’re here to help and we’d love to hear from you! Whether you have
          questions, feedback, or need assistance, our team is ready to provide
          the support you need.
        </p>
        <div className="mt-16 flex flex-col gap-14 lg:gap-5 bg-white rounded-[5px] p-3 lg:px-5 lg:py-16 w-full lg:flex-row max-w-[1000px] mx-auto">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex w-full items-center gap-2 border-b py-2">
              <FaLocationDot className="text-3xl" />
              <div className="text-start">
                <h1 className="font-semibold text-blue-500">Location</h1>
                <p>Canal road mardan KP main center, 2nd floor</p>
              </div>
            </div>
            <div className="flex w-full items-center gap-2 border-b py-2">
              <FaPhoneAlt className="text-3xl" />
              <div className="text-start">
                <h1 className="font-semibold text-blue-500">Phone</h1>
                <p>098034683</p>
              </div>
            </div>
            <div className="flex w-full items-center gap-2 border-b py-2">
              <MdEmail className="text-3xl" />
              <div className="text-start">
                <h1 className="font-semibold text-blue-500">Email</h1>
                <p>dummyxyz@gmail.com</p>
              </div>
            </div>
          </div>
          <hr className="border-black" />
          <form className="flex flex-col gap-6 w-full">
            <div className="flex flex-col">
              <label className="self-start text-sm font-semibold m1-3 pl-3">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                className="w-full border rounded-full py-2 px-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="self-start text-sm font-semibold m1-3 pl-3">
                Email
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                required
                className="w-full border rounded-full py-2 px-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="self-start text-sm font-semibold m1-3 pl-3">
                Message
              </label>
              <textarea
                type="text"
                placeholder="Write your message"
                required
                className="w-full border rounded-[5px] py-2 px-2"
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
