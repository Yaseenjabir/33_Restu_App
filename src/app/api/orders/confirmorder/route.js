import { NextResponse } from "next/server";
import { costumerSchema } from "../../../../../schemas/costumerSchema";
import { userSignupSchema } from "../../../../../schemas/userSignup";
import { confirmedOrdersSchema } from "../../../../../schemas/confirmedorder";
import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";

export async function POST(req) {
  try {
    await mongoose.connect(dbref);

    const payload = await req.json();

    const restaurantId = payload[0].restaurantId;
    const costumerId = payload[0].costumerId;

    const filterExistingOrder = {
      "costumer._id": costumerId,
    };

    const existingOrder = await confirmedOrdersSchema.findOne(
      filterExistingOrder
    );
    if (existingOrder) {
      return NextResponse.json(
        {
          status: false,
          message: "Please wait for your previous order to completed",
        },
        { status: 400 }
      );
    }

    const findRestaurant = await userSignupSchema.findOne({
      _id: restaurantId,
    });
    const findCostumer = await costumerSchema.findOne({ _id: costumerId });

    const data = new confirmedOrdersSchema({
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
        city: findRestaurant.city,
      },
      items: payload.map((item) => ({
        image: item.image,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      status: "pending",
    });

    const result = await data.save();

    return NextResponse.json({
      success: true,
      message: "Order Placed Successfully",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
