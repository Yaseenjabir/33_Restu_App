"use client";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toggleValue } from "../../../redux/slices/handleCart";

export default function CartLogo() {
  const [data, setData] = useState([]);

  const fetchData = async (costumerId) => {
    const res = await fetch(`/api/orders/getcartitems/${costumerId}`);
    const data = await res.json();
    if (data.success) {
      setData(data.result);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const costumerJson = localStorage.getItem("costumer");
    const Id = costumerJson && JSON.parse(costumerJson)._id;
    if (Id) {
      fetchData(Id);
    }
  }, []);

  return (
    <>
      <div
        onClick={() => dispatch(toggleValue())}
        className={`fixed bottom-8 cursor-pointer right-5 translate-x-20 bg-white text-3xl rounded-full border p-3 transition-all ease-in-out duration-1000 ${
          data.length > 0 && "translate-x-0 animate-bounce"
        }`}
      >
        <FiShoppingCart />
      </div>
    </>
  );
}
