import mongoose, { Document, Model } from "mongoose";

export interface ReviewDocument extends Document {
  productHandle: string;
  review: string;
  rating: number;
}

const reviewSchema = new mongoose.Schema(
  {
    productHandle: {
      type: String,
    },
    title: {
      type: String,
      required: [true, "A title can not be empty"],
      trim: true,
      maxLength: [100, "A title must have less than 500 characters"],
      minLength: [1, "A title must have at least 1 character"],
    },
    review: {
      type: String,
      required: [true, "A review can not be empty"],
      trim: true,
      maxLength: [500, "A review must have less than 500 characters"],
      minLength: [1, "A review must have at least 1 character"],
    },
    rating: {
      type: Number,
      required: [true, "A review must have a rating"],
      min: 1,
      max: 5,
    },
    author: {
      type: String,
      required: [true, "A review must have an author"],
    },
    createdAt: {
      type: String,
      default: () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        const date = ret.createdAt;
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);
        ret.createdAt = `${day}/${month}/${year}`;
      },
    },
    toObject: { virtuals: true },
  }
);

const Review: Model<ReviewDocument> =
  mongoose.models.Review ||
  mongoose.model<ReviewDocument>("Review", reviewSchema);

export default Review;
