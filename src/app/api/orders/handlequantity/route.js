import { NextResponse } from "next/server";
import { orderSchema } from "../../../../../schemas/orderSchema";
import { foodSchema } from "../../../../../schemas/foodSchema";

export async function PUT(req) {
  const payload = await req.json();

  const { foodId } = payload;

  const filter = { _id: foodId };

  const filter2 = { _id: payload._id };

  const searchedQuery = await foodSchema.findOne(filter);

  const convertToNum = Number(searchedQuery.price);
  const payloadPrice = Number(payload.price);
  let newPrice;
  if (payload.type === "increment") {
    newPrice = payloadPrice + convertToNum;
  } else {
    newPrice = payloadPrice - convertToNum;
    if (newPrice < convertToNum) {
      newPrice = convertToNum;
    }
  }

  const convertedPrice = String(newPrice);

  const result = await orderSchema.findOneAndUpdate(
    filter2,
    {
      ...payload,
      price: convertedPrice,
    },
    { new: true }
  );

  return NextResponse.json({ success: true, result });
}
