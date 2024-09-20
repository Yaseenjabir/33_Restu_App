import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../../database/database";
import { userSignupSchema } from "../../../../../../schemas/userSignup";

export async function GET(req, { params }) {
  try {
    const id = params.slug;

    await mongoose.connect(dbref);

    const filter = { _id: id };
    const result = await userSignupSchema.findOne(filter);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "No data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Data found", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!!" },
      { status: 500 }
    );
  }
}
