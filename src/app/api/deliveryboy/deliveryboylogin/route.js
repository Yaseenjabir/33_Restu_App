import { NextResponse } from "next/server";
import { deliveryBoySchema } from "../../../../../schemas/deliveryBoy";
import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";

export async function POST(req) {
  try {
    const payload = await req.json();

    await mongoose.connect(dbref);

    const { email, password } = payload;

    const filter = { email, password };

    const result = await deliveryBoySchema.findOne(filter);

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: "No user found with this credentials, please try again",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        " We're excited to have you on board. Your account has been successfully created",
      result,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
