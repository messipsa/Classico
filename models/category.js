import mongoose from "mongoose";

const catgorySchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", catgorySchema);
