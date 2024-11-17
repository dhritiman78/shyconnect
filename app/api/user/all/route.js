import { authenticateAndFetchUser } from "@/utils/authUtils"; // Utility for authentication
import User from "@/models/user"; // Assuming this is the User model
import { NextResponse } from "next/server";

export async function GET(req) {
  // Authenticate the user and fetch their data
  const { user: currentUser, error } = await authenticateAndFetchUser(req);
  if (error) return error;

  try {
    // Get the IDs of users that are already connected (both accepted and pending)
    const connectedUserIds = currentUser.connections
      .filter(connection => connection.status === "accepted" || connection.status === "pending")
      .map(connection => connection.userId.toString());

    // Start building the filter for the query
    let filter = {};

    // Filter based on user's gender
    if (currentUser.gender === 'male') {
      filter.gender = 'female'; // Send only females to male users
    } else if (currentUser.gender === 'female') {
      filter.gender = 'male'; // Send only males to female users
    }

    // Ensure users already in connections (pending or accepted) are not shown
    filter._id = { $nin: connectedUserIds };

    // Fetch users based on the filter
    const users = await User.find(filter).select("_id name bio email course school department avataar gender");

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 505 });
  }
}
