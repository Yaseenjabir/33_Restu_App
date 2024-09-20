import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function About() {
  return (
    <>
      <section className="bg-gray-50">
        <div
          id="aboutPage"
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
                  <Link href="/about">About</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-white font-bold relative mt-2">About Us</h1>
        </div>
        <div className="w-full py-10 px-5 max-w-[1000px] mx-auto mt-10">
          <h1 className="text-2xl font-semibold mb-5">
            Welcome to <span className="text-blue-500">EatsEase</span>
          </h1>
          <p>
            At <span className="text-blue-500">EatsEase</span>, we’re passionate
            about making your dining and shopping experience as seamless and
            enjoyable as possible. Our innovative food delivery platform
            connects you with a wide range of restaurants and stores, ensuring
            that your favorite meals and essential groceries are just a few
            clicks away.
          </p>
        </div>
        <h1 className="text-2xl text-center px-5 font-semibold ">
          What we offer
        </h1>
        <div className="w-full py-10 px-5 max-w-[1000px] mx-auto text-center items-center justify-start flex gap-5 flex-col md:flex-row">
          <p className="bg-white py-5 px-5 rounded shadow-lg max-w-[600px] md:w-[400px] md:min-h[230px]">
            We empower local eateries by providing a robust platform to showcase
            their menus and reach more customers. With easy-to-use tools,
            restaurants can manage their orders, update their offerings, and
            grow their business effortlessly.
          </p>
          <p className="bg-white py-5 px-5 rounded shadow-lg max-w-[600px] md:w-[400px] md:min-h[230px]">
            Whether you’re craving a gourmet meal or need to stock up on
            essentials, our app connects you with top-rated restaurants and
            shops in your area. Enjoy the ease of browsing menus, placing
            orders, and tracking deliveries right from your phone.
          </p>
          <p className="bg-white py-5 px-5 rounded shadow-lg max-w-[600px] md:w-[400px] md:min-h-[230px]">
            Our dedicated delivery team plays a crucial role in ensuring timely
            and efficient service. We offer flexible working opportunities and
            support to help our delivery partners succeed while bringing smiles
            to our customers.
          </p>
        </div>
        <h1 className="text-2xl text-center px-5 font-semibold mt-20 mb-10">
          Meet Our Team
        </h1>
        <p className="max-w-[700px] px-5 mx-auto mb-10 text-center">
          At <span className="font-semibold text-blue-500">EatsEase</span>, our
          success is driven by the incredible people who make up our team. Each
          member brings a unique set of skills, experiences, and perspectives to
          the table, united by a shared vision of revolutionizing the delivery
          experience
        </p>
        <div className="w-full px-5 flex flex-col items-center justify-center gap-y-16 lg:flex-row gap-x-5 max-w-[1000px] mx-auto">
          <div>
            <Image
              alt="cofounder"
              src={
                "https://images.unsplash.com/photo-1557862921-37829c790f19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"
              }
              width={400}
              height={400}
              layout="responsive"
              className="w-full max-w-[400px]"
            />
            <div className="flex shadow-xl shadow-[#0000003a] flex-col items-center justify-center text-center py-5 max-w-[400px]">
              <h1 className="text-xl font-semibold">James Cooper</h1>
              <p className="text-gray-700">CoFounder</p>
              <div className="flex gap-2 text-xl mt-5">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
              </div>
            </div>
          </div>
          <div>
            <Image
              alt="owner"
              src={
                "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D"
              }
              width={400}
              height={400}
              layout="responsive"
              className="w-full max-w-[400px]"
            />
            <div className="flex shadow-xl shadow-[#0000003a] flex-col items-center justify-center text-center py-5 max-w-[400px]">
              <h1 className="text-xl font-semibold">Alex Carter</h1>
              <p className="text-gray-700">Owner</p>
              <div className="flex gap-2 text-xl mt-5">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
              </div>
            </div>
          </div>
          <div>
            <Image
              alt="manager"
              src={
                "https://images.unsplash.com/photo-1541752171745-4176eee47556?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"
              }
              width={400}
              height={400}
              layout="responsive"
              className="w-full max-w-[400px]"
            />
            <div className="flex shadow-xl shadow-[#0000003a] flex-col items-center justify-center text-center py-5 max-w-[400px]">
              <h1 className="text-xl font-semibold">Walter White</h1>
              <p className="text-gray-700">Manager</p>
              <div className="flex gap-2 text-xl mt-5">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-10 px-5 mt-20 max-w-[1000px] mx-auto">
          <h1 className="text-2xl font-semibold mb-5">Our Mission</h1>
          <p>
            Our mission is simple: To bridge the gap between hungry customers,
            quality restaurants, and reliable delivery services. We strive to
            provide exceptional service and convenience to our users by offering
            a comprehensive solution for food and grocery delivery.
          </p>
        </div>
      </section>
    </>
  );
}
