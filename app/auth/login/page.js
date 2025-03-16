"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaHeart, FaUser, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

const Page = () => {
  const [logging, setLogging] = useState(false)
  const router = useRouter()
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogging(true)
    const response = await fetch('/api/auth/login',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData),
      credentials: 'include',
    })
    if (response.status == 200) {
      const data = await response.json()
      setLogging(false)
      localStorage.setItem('refreshToken',data.token)
      window.location.reload()
      router.push('/'); 
      toast.success("Login Successfull 🎉")
    } else if (response.status == 404) {
      setLogging(false)
      toast.error("User with this email not found!")
    } else if (response.status == 401) {
      setLogging(false)
      toast.error("Invalid credentials!")
    } else {
      setLogging(false)
      toast.error("Something went wrong! Please try again later")
    }
    console.log(loginData)
  }
  return (
    <div className="min-h-screen max-sm:px-3 flex items-center justify-center bg-pink-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="text-center">
          <FaHeart className="text-pink-500 text-4xl mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome to ShyConnect ❤️
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find your perfect match. Login to start your journey!
          </p>
        </div>

        {/* Form */}
        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={loginData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none dark:bg-pink-400 dark:hover:bg-pink-500"
          >
            {logging?"Logging In ... ":"Find Love Now 💕"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            New to LoveConnect?{" "}
            <a
              href="/auth/register"
              className="text-pink-500 hover:underline dark:text-pink-400"
            >
              Sign up here!
            </a>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Forgot your password?{" "}
            <a
              href="#"
              className="text-pink-500 hover:underline dark:text-pink-400"
            >
              Reset it here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
