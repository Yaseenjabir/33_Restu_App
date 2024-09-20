import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../../database/database";
import { foodSchema } from "../../../../../../schemas/foodSchema";

export async function GET(req, { params }) {
  try {
    const query = params.slug;

    const _id = query[0];
    const foodName = query[1];

    await mongoose.connect(dbref);

    const filter = {
      restaurant_id: _id,
      foodName: { $regex: new RegExp(foodName, "i") },
    };

    const result = await foodSchema.find(filter);

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: "No data available" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Data found", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
