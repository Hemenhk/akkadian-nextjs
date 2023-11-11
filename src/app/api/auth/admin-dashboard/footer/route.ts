import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import AdminDashboard from "@/models/adminDashboard";

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await req.json();

    
    const footerBackgroundColor: string = reqBody.footerBackgroundColor;

    console.log(footerBackgroundColor);

    const { _id } = await AdminDashboard.findOne();


    const footerValues = await AdminDashboard.updateOne(
      {
        _id,
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