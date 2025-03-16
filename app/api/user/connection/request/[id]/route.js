import User from "@/models/user";
import { authenticateAndFetchUser } from "@/utils/authUtils";
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = await params; // Extract target user ID
    if (!id) {
      return NextResponse.json({ message: "Target user ID is required!" }, { status: 400 });
    }
    const { user, error } = await authenticateAndFetchUser(req);
    if (error) return error;

    // Validate the requesting user
    const requestingUser = await User.findById(user._id, "_id name connections").lean();
    if (!requestingUser) {
      return NextResponse.json({ message: "Requesting user not found!" }, { status: 404 });
    }

    // Initialize connections if undefined
    requestingUser.connections = requestingUser.connections || [];

    // Validate the target user
    const targetUser = await User.findById(id, "_id connections").lean();
    if (!targetUser) {
      return NextResponse.json({ message: "Target user not found!" }, { status: 404 });
    }

    targetUser.connections = targetUser.connections || [];

    // Check if a connection already exists
    const isAlreadyConnected = requestingUser.connections.some(
      (connection) => connection.userId.toString() === id
    );
    if (isAlreadyConnected) {
      return NextResponse.json({ message: "Connection request already sent!" }, { status: 400 });
    }

    // Add the connection request (status: "pending") to both users
    const updateRequestingUser = User.findByIdAndUpdate(requestingUser._id, {
      $push: { connections: { userId: id, status: "pending", direction: "sent", } },
    });

    const updateTargetUser = User.findByIdAndUpdate(targetUser._id, {
      $push: { connections: { userId: requestingUser._id, status: "pending", direction: "received", } },
    });

    // Execute both updates concurrently
    await Promise.all([updateRequestingUser, updateTargetUser]);

    return NextResponse.json({ message: "Connection request sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error processing connection request:", error.message);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
