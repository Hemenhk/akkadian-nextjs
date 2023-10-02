import { connectToDatabase } from "@/lib/db";
import AdminDashboard from "@/models/adminDashboard";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    await connectToDatabase();
    const reqBody = await request.json();

    const logoImage = reqBody.logoUrl;

    const idString = "651aa8d46429b3029ca2c537";

    const logoValue = await AdminDashboard.updateOne(
      { _id: idString },
      {
        $set: {
            logo: logoImage,
        },
      }
    );

    return NextResponse.json({ success: true, logoValue });
  } catch (error) {
    console.log(error);
  }
}
