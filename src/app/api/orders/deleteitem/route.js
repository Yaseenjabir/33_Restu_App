import { NextResponse } from "next/server";
import { orderSchema } from "../../../../../schemas/orderSchema";

export async function DELETE(req) {
  try {
    const payload = await req.json();

    const { _id } = payload;

    const filter = { _id };

    console.log("ID is :", _id);

    const result = await orderSchema.findOneAndDelete(filter);
    if (!result) {
      return NextResponse.json(
        { success: false, message: "Failed to delete item" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      result,
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!!" },
      { status: 500 }
    );
  }
}
