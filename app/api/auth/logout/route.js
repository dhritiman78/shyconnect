// app/api/users/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout successful" });

  // Properly delete cookies by setting them with an expired date
  response.cookies.set("accessToken", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return response;
}
