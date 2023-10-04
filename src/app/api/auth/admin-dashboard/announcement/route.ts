import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import AdminDashboard from "@/models/adminDashboard";

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await req.json();

    const announcementText: string = reqBody.announcementText;
    const announcementColor: string = reqBody.announcementColor;

    console.log(announcementText);
    console.log(announcementColor);

    const { _id } = await AdminDashboard.findOne();

    const announcementValues = await AdminDashboard.updateOne(
      {
        _id,
      },
      {
        $set: {
          announcementColor: announcementColor,
          announcementText: announcementText,
        },
      }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      data: {
        announcement: announcementValues,
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
    const announcementValue = await AdminDashboard.find();

    if (!announcementValue) {
      throw new Error("Document not found");
    }

    return NextResponse.json({
      status: 200,
      success: true,
      announcementValue,
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
