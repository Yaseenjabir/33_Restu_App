import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";
import { completedOrdersSchema } from "../../../../../schemas/completedorders";
import { userSignupSchema } from "../../../../../schemas/userSignup";
import { costumerSchema } from "../../../../../schemas/costumerSchema";

export async function POST(req) {
  try {
    await mongoose.connect(dbref);

    const payload = await req.json();

    console.log(payload);
    const restaurantId = payload.restaurant._id;
    const costumerId = payload.costumer._id;
    const findRestaurant = await userSignupSchema.findOne({
      _id: restaurantId,
    });
    const findCostumer = await costumerSchema.findOne({ _id: costumerId });

    const data = new completedOrdersSchema({
      costumer: {
        _id: findCostumer._id,
        emailAddress: findCostumer.emailAddress,
        name: findCostumer.name,
        location: findCostumer.location,
      },
      restaurant: {
        _id: findRestaurant._id,
        email: findRestaurant.email,
        name: findRestaurant.name,
        location: findRestaurant.location,
        contact: findRestaurant.contact,
      },
      items: payload.items.map((item) => ({
        image: item.image,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      status: payload.status,
      deliveryBoy: payload.deliveryBoy,
    });

    const result = await data.save();

    return NextResponse.json({
      success: true,
      message: "Order si completed",
      result,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
