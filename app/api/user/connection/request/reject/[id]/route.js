import { authenticateAndFetchUser } from "@/utils/authUtils";
import User from "@/models/user"; // Adjust the path based on your structure
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = await params; // Extract the connection request ID from the URL

  // Authenticate the user and fetch their data
  const { user: currentUser, error } = await authenticateAndFetchUser(req);
  if (error) return error;

  try {
    // Find the connection request in the current user's connections
    const connectionIndex = currentUser.connections.findIndex(
      (conn) => conn.userId.toString() === id && conn.status === "pending"
    );

    if (connectionIndex === -1) {
      return NextResponse.json(
        { message: "Connection request not found or already processed!" },
        { status: 404 }
      );
    }

    // Remove the connection from the current user's connections
    currentUser.connections.splice(connectionIndex, 1);
    await currentUser.save();

    // Update the other user's connections by removing the corresponding connection
    const otherUser = await User.findById(id);
    if (otherUser) {
      const reverseConnectionIndex = otherUser.connections.findIndex(
        (conn) => conn.userId.toString() === currentUser._id.toString()
      );
      if (reverseConnectionIndex !== -1) {
        otherUser.connections.splice(reverseConnectionIndex, 1);
        await otherUser.save();
      }
    }

    return NextResponse.json(
      { message: "Connection request rejected and removed successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error rejecting connection request:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
