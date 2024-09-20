import mongoose from "mongoose";
import { dbref } from "../../../../../../database/database";
import { orderSchema } from "../../../../../../schemas/orderSchema";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const costumerId = params.slug;

    await mongoose.connect(dbref);

    const filter = { costumerId };

    const result = await orderSchema.find(filter);
    if (result.length < 1) {
      return NextResponse.json(
        { success: false, message: "No data found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Data found", result });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
