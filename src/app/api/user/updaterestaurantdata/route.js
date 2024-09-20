import { NextResponse } from "next/server";
import { userSignupSchema } from "../../../../../schemas/userSignup";

export async function PUT(req) {
  try {
    const payload = await req.json();

    const { id } = payload;
    console.log(payload);

    const filter = { _id: id };
    const result = await userSignupSchema.findOneAndUpdate(
      filter,
      payload.input,
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { success: false, message: "No data updated" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Data updated Successfully", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
