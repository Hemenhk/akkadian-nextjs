import { connectToDatabase } from "@/lib/db";
import AdminDashboard from "@/models/adminDashboard";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    await connectToDatabase();
    const reqBody = await request.json();

    const logoImage = reqBody.logoUrl;

    const { _id } = await AdminDashboard.findOne();
    

    const logoValue = await AdminDashboard.updateOne(
      { _id: _id },
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
