import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../../database/database";
import { completedOrdersSchema } from "../../../../../../schemas/completedorders";

export async function GET(req, { params }) {
  try {
    const _id = params.slug;

    await mongoose.connect(dbref);

    const filter = { deliveryBoy: _id };

    const result = await completedOrdersSchema.find(filter);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "No data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Data found successfully", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Somthing went wrong" },
      { status: 500 }
    );
  }
}
