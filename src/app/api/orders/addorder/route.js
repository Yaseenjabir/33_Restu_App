import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../database/database";
import { orderSchema } from "../../../../../schemas/orderSchema";

export async function POST(req) {
  try {
    const payload = await req.json();
    await mongoose.connect(dbref);

    const filter = { foodId: payload.foodId, costumerId: payload.costumerId };

    const existingItem = await orderSchema.find(filter);
    if (existingItem.length > 0) {
      return NextResponse.json({
        success: false,
        message: "❌ Item already added in cart",
      });
    }

    // Check if there are items from a different restaurant
    const itemsFromDifferentRestaurant = await orderSchema.find({
      costumerId: payload.costumerId,
      restaurantId: { $ne: payload.restaurantId },
    });

    // If there are items from a different restaurant, remove them
    if (itemsFromDifferentRestaurant.length > 0) {
      await orderSchema.deleteMany({
        costumerId: payload.costumerId,
        restaurantId: { $ne: payload.restaurantId },
      });
    }

    const data = new orderSchema(payload);
    const result = await data.save();
    if (!result) {
      return NextResponse.json(
        { success: false, message: "❌ Item did not added" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, result, message: "✔️ Item added to cart" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "❌ Something went wrong" },
      { status: 200 }
    );
  }
}
