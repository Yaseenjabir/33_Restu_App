import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { deliveryBoySchema } from "../../../../../../schemas/deliveryBoy";
import { dbref } from "../../../../../../database/database";

export async function GET(req, { params }) {
  try {
    const _id = params.slug;
    await mongoose.connect(dbref);

    const filter = { _id };

    const result = await deliveryBoySchema.findOne(filter);
    if (!result) {
      return NextResponse.json(
        { success: false, message: "No user found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User found successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
