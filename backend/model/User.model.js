import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name cannot be left empty"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email cannot be empty"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
