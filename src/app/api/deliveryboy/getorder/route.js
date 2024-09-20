import { NextResponse } from "next/server";
import { confirmedOrdersSchema } from "../../../../../schemas/confirmedorder";
import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";

export async function POST(res) {
  try {
    const payload = await res.json();

    await mongoose.connect(dbref);

    const { city, status } = payload;

    const filter = {
      "restaurant.city": { $regex: new RegExp(city, "i") },
      status,
    };

    const result = await confirmedOrdersSchema.find(filter);
    console.log(filter);
    if (result.length < 1) {
      return NextResponse.json(
        { success: false, message: "No data found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Data found",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
