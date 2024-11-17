import { authenticateAndFetchUser } from "@/utils/authUtils";
import User from "@/models/user"; // Adjust the path based on your structure
import { NextResponse } from "next/server";

export async function GET(req) {
  // Authenticate the user and fetch their data
  const { user: currentUser, error } = await authenticateAndFetchUser(req);
  if (error) return error;

  try {
    // Filter connections for pending requests with direction "received"
    const receivedRequests = currentUser.connections.filter(
      (connection) => connection.status === "pending" && connection.direction === "received"
    );

    // Fetch additional details for each user in the received requests
    const userDetails = await Promise.all(
      receivedRequests.map(async (request) => {
        const user = await User.findById(request.userId, "name course department avatar").lean();
        return {
          userId: request.userId,
          status: request.status,
          name: user?.name || "Unknown",
          course: user?.course || "N/A",
          department: user?.department || "N/A",
          avatar: user?.avatar || null, // Use a default icon if avatar is not set
        };
      })
    );

    return NextResponse.json({ requests: userDetails }, { status: 200 });
  } catch (error) {
    console.error("Error fetching connection requests:", error.message);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
