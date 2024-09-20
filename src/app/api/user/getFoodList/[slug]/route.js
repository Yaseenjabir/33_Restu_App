import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../../database/database";
import { foodSchema } from "../../../../../../schemas/foodSchema";

export async function GET(req, { params }) {
  try {
    const id = params.slug;

    await mongoose.connect(dbref);

    const filter = { restaurant_id: id };

    const result = await foodSchema.find(filter);
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: "No data available for your resturant" },
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
