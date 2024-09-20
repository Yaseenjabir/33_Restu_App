import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../../database/database";
import { confirmedOrdersSchema } from "../../../../../../schemas/confirmedorder";

export async function GET(req, { params }) {
  try {
    const id = params.slug;

    await mongoose.connect(dbref);

    const filter = { "restaurant._id": id };

    const result = await confirmedOrdersSchema.find(filter);

    if (result.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Sorry, no data found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Data fetched successfully",
      result,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something Went Wrong",
    });
  }
}
