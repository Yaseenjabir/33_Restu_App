import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../database/database";
import { costumerSchema } from "../../../../../schemas/costumerSchema";

export async function POST(req) {
  try {
    const payload = await req.json();

    await mongoose.connect(dbref);

    const existingUser = await costumerSchema.findOne({
      emailAddress: payload.emailAddress,
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exist with this email" },
        { status: 200 }
      );
    }

    const newUser = new costumerSchema(payload);

    const result = await newUser.save();

    if (result) {
      console.log(result);
      return NextResponse.json(
        {
          success: true,
          message: "You're account has been created, please login now",
          result,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
