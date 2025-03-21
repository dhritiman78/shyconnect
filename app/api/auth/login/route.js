import User from "@/models/user";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "@/utils/generateTokens";

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
    const access_token = generateAccessToken(user);
    const refresh_token = generateRefreshToken(user);

    // Set cookie with the token
    const response = NextResponse.json({ message: "Successfully Logged in"}, { status: 200 });
    response.cookies.set("accessToken", access_token, {
        httpOnly: true,
        secure: true, // Secure should be true in production
        sameSite: "None", // Required for cross-origin requests
        path: "/",
        maxAge: 60 * 15, // 15 minutes
      });

   response.cookies.set("refreshToken", refresh_token, {
        httpOnly: true,
        secure: true, // Secure should be true in production
        sameSite: "None", // Required for cross-origin requests
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      // response.cookies.set('__vercel_live_token', token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production', // Use Secure only in production
      //   sameSite: 'None', // Enable cross-site usage
      //   path: '/',
      // });     
    return response;
   }

    return NextResponse.json({ message: "Something went wrong!" }, { status: 505 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 505 });
  }
}
