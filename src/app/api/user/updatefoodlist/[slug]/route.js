import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../../database/database";
import { foodSchema } from "../../../../../../schemas/foodSchema";

export async function GET(res, { params }) {
  try {
    const id = params.slug;

    await mongoose.connect(dbref);

    const filter = { _id: id };
    const result = await foodSchema.findOne(filter);
    if (!result) {
      return NextResponse.json(
        { success: false, message: "No data found with such ID" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!!" },
      { status: 500 }
    );
  }
}
