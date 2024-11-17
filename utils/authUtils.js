import User from "@/models/user"; // Adjust the path based on your structure
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";

export async function authenticateAndFetchUser(req) {
  try {
    // Extract the Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: NextResponse.json({ message: "Unauthorized access!" }, { status: 401 }) };
    }

    // Extract and verify the token
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token, process.env.NEXT_JWT_REFRESH);
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
