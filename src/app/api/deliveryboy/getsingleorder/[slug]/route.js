import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../../database/database";
import { confirmedOrdersSchema } from "../../../../../../schemas/confirmedorder";

export async function GET(req, { params }) {
  try {
    const _id = params.slug;

    await mongoose.connect(dbref);

    let filter = { _id };

    const result = await confirmedOrdersSchema.findOne(filter);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "No result found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ sucess: true, message: "Data found", result });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
