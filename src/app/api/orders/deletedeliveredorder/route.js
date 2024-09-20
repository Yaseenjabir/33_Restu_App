import { NextResponse } from "next/server";
import { confirmedOrdersSchema } from "../../../../../schemas/confirmedorder";

export async function DELETE(req) {
  try {
    const payload = await req.json();

    const { _id } = payload;
    console.log(_id);
    const filter = { _id };

    const result = await confirmedOrdersSchema.findOneAndDelete(filter);

    return NextResponse.json({
      success: true,
      message: "Item deleted successfully",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
