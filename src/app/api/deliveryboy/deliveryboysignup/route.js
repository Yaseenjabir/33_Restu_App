import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";
import { deliveryBoySchema } from "../../../../../schemas/deliveryBoy";
import { NextResponse } from "next/server";

export async function POST(res) {
  try {
    const payload = await res.json();

    const { email } = payload;

    const filter = { email };

    const existingUser = await deliveryBoySchema.findOne(filter);

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "This email is already registered" },
        { status: 400 }
      );
    }

    await mongoose.connect(dbref);

    const data = new deliveryBoySchema(payload);
    const result = await data.save();

    if (!result) {
      return NextResponse.json(
        { success: false, message: "User didn't registered, please try again" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User signed up successfully",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { sucess: false, message: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
