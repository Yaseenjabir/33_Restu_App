import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../database/database";
import { foodSchema } from "../../../../../schemas/foodSchema";

export async function DELETE(res) {
  try {
    const payload = await res.json();

    const id = payload._id;

    mongoose.connect(dbref);

    const data = await foodSchema.findByIdAndDelete(id);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to delete the item" },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Item Deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something Went Wrong!!",
    });
  }
}
