import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

import AdminDashboard from "@/models/adminDashboard";
import { connectToDatabase } from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await req.json();

    const idString = "65194f3b758aba7d2d57b3d1";

    const heroHeading: string = reqBody.heroHeading;
    const heroSubHeading: string = reqBody.heroSubHeading;
    const heroButtonText: string = reqBody.heroButtonText;
    const heroButtonColor: string = reqBody.heroButtonColor;

    const id = await AdminDashboard.findOne({ _id: idString });

    const heroValues = await AdminDashboard.updateOne(
      {
        _id: id,
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
