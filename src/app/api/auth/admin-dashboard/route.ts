import { connectToDatabase } from "@/lib/db";
import AdminDashboard from "@/models/adminDashboard";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  try {
    const reqBody = await req.json()

    const adminDashboard = await AdminDashboard.create(reqBody);

    if (!req.body) {
      throw new Error("Nothing was passed into the form!");
    }

    return NextResponse.json({
      status: 201,
      success: true,
      data: {
        dashboard: adminDashboard,
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
