import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";
import { confirmedOrdersSchema } from "../../../../../schemas/confirmedorder";
import { NextResponse } from "next/server";

export async function PUT(res) {
  try {
    const payload = await res.json();

    const { _id } = payload;

    await mongoose.connect(dbref);

    const filter = { _id };

    const result = await confirmedOrdersSchema.findOneAndUpdate(
      filter,
      {
        status: "ready",
      },
      { new: true }
    );

    return NextResponse.json(
      { success: true, message: "Data updated succesfully", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
