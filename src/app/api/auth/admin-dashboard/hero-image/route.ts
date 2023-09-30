import { connectToDatabase } from "@/lib/db";
import AdminDashboard from "@/models/adminDashboard";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    await connectToDatabase();
    const reqBody = await request.json();

    const heroImage = reqBody.imageUrl;

    const idString = "65187cf0f9121cfb00e1a491";

    const heroImageValue = await AdminDashboard.updateOne(
      { _id: idString },
      {
        $set: {
          heroImage: heroImage,
        },
      }
    );

    return NextResponse.json({ success: true, heroImageValue });
  } catch (error) {
    console.log(error);
  }
}
