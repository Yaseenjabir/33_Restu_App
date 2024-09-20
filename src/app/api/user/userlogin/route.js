import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";
import { userSignupSchema } from "../../../../../schemas/userSignup";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const payload = await req.json();

    await mongoose.connect(dbref);

    const filter = { email: payload.email, password: payload.password };

    const user = await userSignupSchema.findOne(filter);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials, please try again" },
        { status: 404 }
      );
    }

    console.log(user);
    return NextResponse.json(
      { success: true, message: "You are now logged in", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
}
