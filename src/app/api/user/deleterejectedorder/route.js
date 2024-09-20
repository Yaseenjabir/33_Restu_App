import mongoose from "mongoose";
import { dbref } from "../../../../../database/database";
import { confirmedOrdersSchema } from "../../../../../schemas/confirmedorder";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const payload = await req.json();
  const { _id } = payload;

  await mongoose.connect(dbref);

  const result = await confirmedOrdersSchema.findOneAndDelete({ _id });

  return NextResponse.json(result);
}
