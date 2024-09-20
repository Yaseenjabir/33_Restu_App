import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";
import { NextResponse } from "next/server";
import { foodSchema } from "../../../../../schemas/foodSchema";

export async function POST(params) {
  try {
    const payload = await params.json();

    await mongoose.connect(dbref);

    const foodItem = new foodSchema(payload);
    const result = await foodItem.save();

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to add your item, please try again",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Your food item has been added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!!" },
      { status: 500 }
    );
  }
}
