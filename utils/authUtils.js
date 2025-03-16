import User from "@/models/user"; // Adjust the path based on your structure
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";

export async function authenticateAndFetchUser(req) {
  try {

    const accessToken = req.cookies.get("accessToken");
    const refreshToken = req.cookies.get("refreshToken");

    // FOR DEVELOPMENT PURPOSES ONLY
    if (!accessToken) {
      return { error: NextResponse.json({ message: "No token provided!" }, { status: 401 }) };
    }

    const decoded = verifyToken(accessToken.value, process.env.NEXT_JWT_ACCESS);
    if (!decoded || !decoded.id) {
      return { error: NextResponse.json({ message: "Invalid token!" }, { status: 401 }) };
    }

    // Fetch the current user
    const currentUser = await User.findById(decoded.id, "_id gender connections");
    if (!currentUser) {
      return { error: NextResponse.json({ message: "User not found!" }, { status: 404 }) };
    }

    return { user: currentUser };
  } catch (error) {
    console.error("Authentication error:", error.message);
    return { error: NextResponse.json({ message: "Internal server error" }, { status: 500 }) };
  }
}
