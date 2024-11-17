import User from "@/models/user";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {
    name,
    email,
    password,
    dob,
    gender,
    location,
    school,
    course,
    department,
    bio
  } = await req.json();

  await connectDB();

  try {
    // Create a new user
    const createUser = await User.create({
      name,
      email,
      password,
      dob,
      gender,
      location,
      school,
      course,
      department,
      bio
    });

    // Check if the user was created successfully
    if (createUser) {
      return NextResponse.json({ message: "Successfully Created!" }, { status: 201 });
    }

    // Error if user was not created
    return NextResponse.json({ message: "Something went wrong!" }, { status: 505 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 505 });
  }
}
