import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";
import { NextResponse } from "next/server";
import { costumerSchema } from "../../../../../schemas/costumerSchema";

export async function POST(req) {
  try {
    const payload = await req.json();

    await mongoose.connect(dbref);

    const filter = {
      emailAddress: payload.emailAddress,
      password: payload.password,
    };

    const user = await costumerSchema.findOne(filter);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials, please check your email and password",
        },
        { status: 404 }
      );
    }
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
