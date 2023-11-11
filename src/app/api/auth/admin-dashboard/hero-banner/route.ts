import { NextRequest, NextResponse } from "next/server";

import AdminDashboard from "@/models/adminDashboard";
import { connectToDatabase } from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await req.json();

    

    const heroHeading: string = reqBody.heroHeading;
    const heroSubHeading: string = reqBody.heroSubHeading;
    const heroButtonText: string = reqBody.heroButtonText;
    const heroButtonColor: string = reqBody.heroButtonColor;

    const { _id } = await AdminDashboard.findOne();


    const heroValues = await AdminDashboard.updateOne(
      {
        _id,
      },
      {
        $set: {
          heroHeading: heroHeading,
          heroSubHeading: heroSubHeading,
          heroButtonText: heroButtonText,
          heroButtonColor: heroButtonColor,
        },
      }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      data: {
        hero: heroValues,
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
    const heroValues = await AdminDashboard.find();

    if (!heroValues) {
      throw new Error("Document not found!");
    }

    return NextResponse.json({
      status: 200,
      success: true,
      heroValues,
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
