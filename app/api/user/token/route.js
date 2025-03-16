import User from "@/models/user";
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {

  try {
    const accessToken = req.cookies.get("accessToken").value;
    const refreshToken = req.cookies.get("refreshToken").value;

    const decoded = verifyToken(accessToken, process.env.NEXT_JWT_ACCESS);

    // Validate the decoded user
    const decoded_user = await User.findById(decoded.id, "_id name bio gender email course school department avatar connections");
    if (!decoded_user) {
      return NextResponse.json({ message: "Unauthorized access!" }, { status: 401 });
    }
    // Return the user details
    return NextResponse.json(decoded_user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
