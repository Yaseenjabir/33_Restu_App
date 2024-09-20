import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="border flex-col w-full flex justify-center items-center p-10 bg-gray-50 gap-10 md:flex-row">
        <ul className="w-full flex flex-col gap-5 font-semibold underline cursor-pointer list-disc md:list-none md:w-[300px]">
          <li>Home</li>
          <li>Cart</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <ul className="w-full flex flex-col gap-5 font-semibold underline cursor-pointer list-disc md:list-none md:w-[300px]">
          {" "}
          <li>Services</li>
          <li>Blog</li>
          <li>FAQ</li>
          <li>Support</li>
        </ul>
        <ul className="w-full flex flex-col gap-5 font-semibold underline cursor-pointer list-disc md:list-none md:w-[300px]">
          {" "}
          <li>Products</li>
          <li>Deals</li>
          <li>Testimonials</li>
          <li>Careers</li>
        </ul>
      </footer>
    </>
  );
}
