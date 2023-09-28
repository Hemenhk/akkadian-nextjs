import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import AdminDashboard from "@/models/adminDashboard";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

export async function PATCH(req: NextRequest, params) {
  try {
    await connectToDatabase();

    const reqBody = await req.json();

    const idString = "65152288f3855600d0a212a6";
    const announcementText: string = reqBody.announcementText;
    const announcementColor: string = reqBody.announcementColor;

    console.log(announcementText);
    console.log(announcementColor);

    const id = await AdminDashboard.findOne({ _id: idString });

    const announcementValues = await AdminDashboard.updateOne(
      {
        _id: id,
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

export async function GET(req: NextApiRequest) {
  await connectToDatabase();
  try {
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
