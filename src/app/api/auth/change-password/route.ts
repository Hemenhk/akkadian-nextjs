import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/lib/db";
import AdminAuth from "@/models/adminAuth";
import { hashPassword, verifyPassword } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession();
    await connectToDatabase();

    if (!session) {
      return NextResponse.json({
        status: 401,
        body: {
          success: false,
          message: "Not authenticated!",
        },
      });
    }

    const reqBody = await req.json();
    const adminEmail = session?.user?.email;
    const oldPassword: string = reqBody?.oldPassword;
    const newPassword: string = reqBody?.newPassword;

    // console.log("Received oldPassword:", oldPassword);
    // console.log("Received newPassword:", newPassword);

    if (!oldPassword || !newPassword) {
      return NextResponse.json({
        status: 400, // Bad request status code
        body: {
          success: false,
          message:
            "Invalid request. Both oldPassword and newPassword are required.",
        },
      });
    }

    const adminUser = await AdminAuth.findOne({ email: adminEmail }).select(
      "+password"
    );

    if (!adminUser) {
      return NextResponse.json({
        status: 404,
        body: {
          success: false,
          message: "User not found!",
        },
      });
    }

    const currentPassword = adminUser.password;
    const passwordsAreEqual = await verifyPassword(
      oldPassword,
      currentPassword
    );

    if (!passwordsAreEqual) {
      return NextResponse.json({
        status: 403,
        body: {
          success: false,
          message: "Invalid Password!",
        },
      });
    }

    const hashedNewPassword = await hashPassword(newPassword);

    await AdminAuth.updateOne(
      { email: adminEmail },
      { $set: { password: hashedNewPassword } }
    );

    return NextResponse.json({
      status: 200,
      body: {
        success: true,
        message: "Password updated!",
      },
    });
  } catch (error) {
    // Handle unexpected errors here and provide a meaningful response
    console.error("Unexpected error:", error);
    return NextResponse.json({
      status: 500,
      body: {
        success: false,
        message: "Internal Server Error",
      },
    });
  }
}

