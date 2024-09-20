import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../database/database";
import { userSignupSchema } from "../../../../../schemas/userSignup";

export async function POST(req) {
  try {
    const payload = await req.json();

    await mongoose.connect(dbref);

    const existingUser = await userSignupSchema.findOne({
      email: payload.email,
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email" },
        { status: 200 }
      );
    }

    const newUser = new userSignupSchema(payload);

    const result = await newUser.save();

    if (result) {
      return NextResponse.json(
        {
          success: true,
          message: "Your account has been created successfully",
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
