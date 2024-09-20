import { NextResponse } from "next/server";
import { foodSchema } from "../../../../../schemas/foodSchema";
import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";

export async function PUT(res) {
  try {
    const payload = await res.json();
    await mongoose.connect(dbref);

    console.log(payload);
    const filter = { _id: payload._id };

    const result = await foodSchema.findOneAndUpdate(filter, payload);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Did not found any item" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, result: "Data Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!!" },
      { status: 500 }
    );
  }
}
