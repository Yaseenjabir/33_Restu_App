import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../../database/database";
import { completedOrdersSchema } from "../../../../../../schemas/completedorders";

export async function GET(res, { params }) {
  try {
    const id = params.slug;

    await mongoose.connect(dbref);

    const filter = {
      "restaurant._id": id,
    };

    const result = await completedOrdersSchema.find(filter);

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: "No data available" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Data found successfully", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Sorry, something went wrong" },
      { status: 500 }
    );
  }
}
