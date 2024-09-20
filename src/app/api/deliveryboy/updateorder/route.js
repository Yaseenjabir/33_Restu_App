import { NextResponse } from "next/server";
import { confirmedOrdersSchema } from "../../../../../schemas/confirmedorder";

export async function PUT(req) {
  try {
    const payload = await req.json();

    const { _id, type, deliveryboyId } = payload;

    let status = {
      status: "",
    };

    if (type === "received") {
      status.status = "received";
    } else if (type === "dispatch") {
      status.status = "dispatch";
    } else if (type === "completed") {
      status.status = "completed";
    } else {
      status.status = "pending";
    }

    console.log(status);

    const result = await confirmedOrdersSchema.findOneAndUpdate(
      { _id },
      { ...status, deliveryBoy: deliveryboyId },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { success: false, message: "No data updated" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Data updated successfully",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
