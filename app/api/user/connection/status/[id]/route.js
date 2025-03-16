import User from "@/models/user"; // Adjust path based on your project structure
import { authenticateAndFetchUser } from "@/utils/authUtils";
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params; // Target user's ID

  try {
    const { user, error } = await authenticateAndFetchUser(req);
    if (error) return error;
    // Fetch the current user's data
    const currentUser = await User.findById(user._id, "connections");
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
