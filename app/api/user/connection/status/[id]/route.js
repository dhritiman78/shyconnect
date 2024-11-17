import User from "@/models/user"; // Adjust path based on your project structure
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params; // Target user's ID
  const authHeader = req.headers.get("authorization");

  try {
    // Check for authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized access!" }, { status: 401 });
    }

    // Extract and verify the token
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token, process.env.NEXT_JWT_REFRESH);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: "Invalid token!" }, { status: 401 });
    }

    const currentUserId = decoded.id; // Logged-in user's ID

    // Fetch the current user's data
    const currentUser = await User.findById(currentUserId, "connections");
    if (!currentUser) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    // Check the connection status with the target user
    const connection = currentUser.connections.find((conn) => conn.userId.toString() === id);

    if (!connection) {
      return NextResponse.json({ connection: "none" }, { status: 200 });
    }

    return NextResponse.json({ connection: connection.status }, { status: 200 });
  } catch (error) {
    console.error("Error fetching connection status:", error.message);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
