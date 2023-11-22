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

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await req.json();

    const announcementText: string = reqBody.announcementText;
    const announcementColor: string = reqBody.announcementColor;
    const footerBackgroundColor: string = reqBody.footerBackgroundColor;
    const heroHeading: string = reqBody.heroHeading;
    const heroSubHeading: string = reqBody.heroSubHeading;
    const heroButtonText: string = reqBody.heroButtonText;
    const heroButtonColor: string = reqBody.heroButtonColor;
    const heroImage = reqBody.heroImage;
    const logo = reqBody.logo;


    console.log(announcementText);
    console.log(announcementColor);

    const { _id } = await AdminDashboard.findOne();

    const dashboardValues = await AdminDashboard.updateOne(
      {
        _id,
      },
      {
        $set: {
          announcementColor: announcementColor,
          announcementText: announcementText,
          heroHeading: heroHeading,
          heroSubHeading: heroSubHeading,
          heroButtonText: heroButtonText,
          heroButtonColor: heroButtonColor,
          heroImage: heroImage,
          footerBackgroundColor: footerBackgroundColor,
          logo: logo,
        },
      }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      data: {
        dashboardValues
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
    const dashboardValues = await AdminDashboard.find();

    if (!dashboardValues) {
      throw new Error("Document not found");
    }

    return NextResponse.json({
      status: 200,
      success: true,
      dashboardValues,
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
