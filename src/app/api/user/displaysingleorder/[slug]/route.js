import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbref } from "../../../../../../database/database";
import { confirmedOrdersSchema } from "../../../../../../schemas/confirmedorder";

export async function GET(res, { params }) {
  const _id = params.slug;

  await mongoose.connect(dbref);

  const result = await confirmedOrdersSchema.findOne({ _id });

  return NextResponse.json(result);
}
