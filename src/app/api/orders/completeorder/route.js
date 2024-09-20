import { NextResponse } from "next/server";
import { confirmedOrdersSchema } from "../../../../../schemas/confirmedorder";

export async function PUT(req) {
  try {
    const payload = await req.json();

    const { _id } = payload;

    const filter = { _id };

    const result = await confirmedOrdersSchema.findOneAndUpdate(
      filter,
      {
        status: "completed",
      },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Failed to update data" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thanks for confirming your order",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
