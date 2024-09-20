"use client";
import { useState } from "react";
import MainContent from "../../../../components/main/deliveryboy/mainContent";
import SideBar from "../../../../components/main/deliveryboy/sidebar";

export default function Dashboard() {
  const [navigate, setNavigate] = useState("available orders");

  return (
    <>
      <section className="w-full min-h-[100vh] flex flex-col md:flex-row">
        <SideBar setNavigate={setNavigate} navigate={navigate} />
        <MainContent navigate={navigate} />
      </section>
    </>
  );
}
