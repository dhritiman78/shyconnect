"use client";

import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "../app/context/authContext"; // adjust path if needed
import "react-toastify/dist/ReactToastify.css";

export default function LoaderWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 animate-fadeIn">
        {/* Heart Loader */}
        <div className="relative w-16 h-16 rotate-[-45deg] animate-heartBeat">
          <div className="absolute w-16 h-16 bg-pink-500 rounded-full top-0 left-0"></div>
          <div className="absolute w-16 h-16 bg-pink-500 rounded-full top-0 left-0 translate-x-1/2"></div>
          <div className="absolute w-16 h-16 bg-pink-500 rounded-full top-0 left-0 translate-y-1/2"></div>
        </div>
        <h1 className="text-2xl font-bold text-pink-700 mt-6">shyConnect</h1>
        <p className="text-sm text-pink-500 mt-2">Connecting hearts 💖</p>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Navbar />
      {children}
      <ToastContainer />
    </AuthProvider>
  );
}
