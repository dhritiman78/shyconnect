import User from "@/models/user";
import { authenticateAndFetchUser } from "@/utils/authUtils";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
    // Authenticate the user and fetch their data
    const { currentUser: currentUser, error } = await authenticateAndFetchUser(req);
    if (error) return error;

  try {
    // Fetch the target user by ID
    const user = await User.findById(id, "_id name bio gender email course school department avatar");
    if (!user) {
      return NextResponse.json({ message: "Target user not found!" }, { status: 404 });
    }

    // Return the user details
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
