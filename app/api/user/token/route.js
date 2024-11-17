import User from "@/models/user";
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {

  try {
    // Extract the Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized access!" }, { status: 401 });
    }

    // Extract and verify the token
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token, process.env.NEXT_JWT_REFRESH);

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
