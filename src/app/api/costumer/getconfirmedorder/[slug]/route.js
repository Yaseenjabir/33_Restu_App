import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../../database/database";
import { confirmedOrdersSchema } from "../../../../../../schemas/confirmedorder";

export async function GET(req, { params }) {
  try {
    const id = params.slug;

    await mongoose.connect(dbref);

    const filter = {
      "costumer._id": id,
    };

    const result = await confirmedOrdersSchema.findOne(filter);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "No data found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Data fetched successfully",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
