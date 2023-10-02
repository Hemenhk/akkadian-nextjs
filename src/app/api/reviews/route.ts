import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import Review from "@/models/reviewSchema";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await req.json();
    const { productHandle, review, rating, author, title} = reqBody;

    const newReview = new Review({ productHandle, review, rating, author, title });
    await newReview.save();

    return NextResponse.json({
      status: 200,
      success: true,
      data: {
        reviews: newReview,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      body: {
        success: false,
        error: error.message,
      },
    });
  }
}
