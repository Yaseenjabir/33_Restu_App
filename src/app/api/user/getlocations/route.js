import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";
import { userSignupSchema } from "../../../../../schemas/userSignup";

export async function GET() {
  try {
    await mongoose.connect(dbref);
    const data = await userSignupSchema.find();

    const locations = [...new Set(), data.map((item) => item.location)];

    return NextResponse.json({ success: true, locations }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Somthing Went Wrong!!" },
      { status: 500 }
    );
  }
}
