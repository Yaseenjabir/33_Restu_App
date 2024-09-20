import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";
import { deliveryBoySchema } from "../../../../../schemas/deliveryBoy";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const payload = await req.json();

    const { _id } = payload;

    await mongoose.connect(dbref);

    const filter = { _id };

    const result = await deliveryBoySchema.findOneAndUpdate(filter, payload, {
      new: true,
    });

    if (!result) {
      return NextResponse.json(
        { success: false, message: "No data updated" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
