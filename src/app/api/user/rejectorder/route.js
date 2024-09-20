import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";
import { confirmedOrdersSchema } from "../../../../../schemas/confirmedorder";
import { NextResponse } from "next/server";

export async function PUT(res) {
  try {
    const payload = await res.json();

    const { _id } = payload;

    await mongoose.connect(dbref);

    const filter = { _id };
    const update = { status: "rejected", $unset: { restaurant: "" } };
    const result = await confirmedOrdersSchema.findOneAndUpdate(
      filter,
      update,
      { new: true }
    );

    return NextResponse.json(
      { success: true, message: "Order has been rejected", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
