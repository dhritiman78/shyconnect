import User from "@/models/user";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { generateRefreshToken } from "@/utils/generateTokens";

export async function POST(req) {
  const {
    email,
    password
  } = await req.json();

  await connectDB();

  try {
    // Check if the user exist
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({message: "User not found!"}, {status: 404})
    }

   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
        return NextResponse.json({message: "Invalid credentials!"}, {status: 401})
   }

   if (user) {
    // Generate refresh token
    const token = generateRefreshToken(user);

    // Set cookie with the token
    const response = NextResponse.json({ message: "Successfully Logged in", token }, { status: 200 });
   // response.cookies.set("refreshToken", token, {
        // httpOnly: true,
        // secure: true, // Secure should be true in production
        // sameSite: "None", // Required for cross-origin requests
        // path: "/",
        // maxAge: 60 * 60 * 24 * 7, // 7 days
      // });
      

    return response;
   }

    return NextResponse.json({ message: "Something went wrong!" }, { status: 505 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 505 });
  }
}
