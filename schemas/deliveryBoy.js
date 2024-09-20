import mongoose from "mongoose";

const model = new mongoose.Schema({
  fullName: String,
  city: String,
  address: String,
  email: String,
  phone: String,
  gender: String,
  vehicalType: String,
  password: String,
});

export const deliveryBoySchema =
  mongoose.models.deliveryBoys || mongoose.model("deliveryBoys", model);
