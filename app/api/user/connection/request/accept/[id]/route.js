import { authenticateAndFetchUser } from "@/utils/authUtils";
import User from "@/models/user"; // Adjust the path based on your structure
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params; // Extract the connection request ID from the URL

  // Authenticate the user and fetch their data
  const { user: currentUser, error } = await authenticateAndFetchUser(req);
  if (error) return error;

  try {
    // Find the connection request in the current user's connections
    const connection = currentUser.connections.find(
      (conn) => conn.userId.toString() === id && conn.status === "pending"
    );

    if (!connection) {
      return NextResponse.json(
        { message: "Connection request not found or already processed!" },
        { status: 404 }
      );
    }

    // Update the status of the connection to "accepted"
    connection.status = "accepted";

    // Save the updated user document
    await currentUser.save();

    // Update the other user's connections to reflect the accepted request
    const otherUser = await User.findById(id);
    if (otherUser) {
      const reverseConnection = otherUser.connections.find(
        (conn) => conn.userId.toString() === currentUser._id.toString()
      );
      if (reverseConnection) {
        reverseConnection.status = "accepted";
        await otherUser.save();
      }
    }

    return NextResponse.json(
      { message: "Connection request accepted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error accepting connection request:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
