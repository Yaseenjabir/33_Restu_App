import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";
import { userSignupSchema } from "../../../../../schemas/userSignup";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const query = request.nextUrl.searchParams;

    let filter = {};
    if (query.get("location")) {
      let location = query.get("location");
      if (location === "All") {
        filter = {};
      } else {
        filter = { location: { $regex: new RegExp(location, "i") } };
      }
    } else if (query.get("restaurant")) {
      let name = query.get("restaurant");
      filter = { name: { $regex: new RegExp(name, "i") } };
    }
    await mongoose.connect(dbref);

    const restaurants = await userSignupSchema.find(filter);

    if (restaurants.length === 0) {
      return NextResponse.json(
        { success: false, message: "No result found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, restaurants }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something Went Wrong" },
      { status: 500 }
    );
  }
}
