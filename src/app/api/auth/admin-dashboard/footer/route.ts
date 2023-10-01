import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import AdminDashboard from "@/models/adminDashboard";

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await req.json();

    const idString = "65194f3b758aba7d2d57b3d1";
    const footerBackgroundColor: string = reqBody.footerBackgroundColor;

    console.log(footerBackgroundColor);

    const id = await AdminDashboard.findOne({ _id: idString });

    const footerValues = await AdminDashboard.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          footerBackgroundColor: footerBackgroundColor,
          
        },
      }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      data: {
        footer: footerValues,
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

export async function GET() {
  try {
    await connectToDatabase();
    const footerValue = await AdminDashboard.find();

    if (!footerValue) {
      throw new Error("Document not found");
    }

    return NextResponse.json({
      status: 200,
      success: true,
      footerValue,
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