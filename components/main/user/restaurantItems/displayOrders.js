"use client";

import { useState } from "react";
import EarningHistory from "./earningHistory";
import OrderList from "./orderlist";

export default function DisplayOrders() {
  const [tab, setTab] = useState("orderList");

  return (
    <>
      <section className="w-full py-10 px-5">
        <h1 className="text-xl">Orders</h1>
        <section className="mt-10">
          <div className="mx-auto max-w-min flex">
            <button
              onClick={() => setTab("orderList")}
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Orders
            </button>
            <button
              onClick={() => setTab("earningHistory")}
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Earnings
            </button>
          </div>
          {tab === "orderList" ? <OrderList /> : <EarningHistory />}
        </section>
      </section>
    </>
  );
}
