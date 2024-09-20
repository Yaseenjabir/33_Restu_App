import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../database/database";
import { orderSchema } from "../../../../../schemas/orderSchema";

export async function DELETE(params) {
  try {
    const payload = await params.json();

    await mongoose.connect(dbref);

    const result = await orderSchema.deleteMany({ costumerId: payload._id });

    if (result.deletedCount < 1) {
      return NextResponse.json(
        { success: false, message: "No item deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Item deleted successfully",
      result,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to delete item",
    });
  }
}
