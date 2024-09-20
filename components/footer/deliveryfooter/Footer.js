import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="border flex-col w-full h-[80px] flex justify-center items-center px-5">
        <ul className="flex gap-3 text-lg">
          <Link
            href="/"
            className="hover:text-blue-500 transition-all ease-in-out duration-100"
          >
            Home
          </Link>
          <Link
            href="/user/userauth"
            className="hover:text-blue-500 transition-all ease-in-out duration-100"
          >
            Register
          </Link>
          <Link
            href="/"
            className="hover:text-blue-500 transition-all ease-in-out duration-100"
          >
            Cart
          </Link>
          <Link
            href="/"
            className="hover:text-blue-500 transition-all ease-in-out duration-100"
          >
            Menu
          </Link>
        </ul>
        <h1 className="my-2 text-gray-700 font-bold">
          All Rights Reserved by @Ezgod
        </h1>
      </footer>
    </>
  );
}
