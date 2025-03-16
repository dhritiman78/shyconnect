"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaPencilAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEdit, AiOutlineLogout, AiOutlineDelete } from "react-icons/ai";
import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter()

  const logout = () => {
    const response = fetch("/api/users/logout", {
      method: "POST",
      credentials: 'include'
  })
  .then(async (res) => {
    if (res.ok) {
      toast.success("Logout successful");
      await router.push("/auth/login");
      window.location.reload();
    } else {
      toast.error("Something went wrong! Please try again later");
    }
  })}

const user = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6 space-y-6">
        {/* Profile Picture */}
<div className="relative mx-auto w-28 h-28 rounded-full overflow-hidden bg-gray-200">
  {user?.avatar ? (
    <Image src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
  ) : (
    <FaUserCircle className="w-full h-full text-gray-400" />
  )}
  {/* Pencil Icon for File Upload */}
  <label
    htmlFor="fileInput"
    className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 shadow-lg transition duration-200"
  >
    <FaPencilAlt size={14} />
  </label>
  <input
    type="file"
    id="fileInput"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        console.log("File selected:", file.name);
        // Add logic to handle the uploaded file
      }
    }}
  />
</div>


        {/* User Info */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
          <p className="text-sm text-gray-600 italic">{user?.bio}</p>
          <div className="text-gray-700 space-y-1">
            <p className="flex items-center justify-center gap-2">
              <HiOutlineMail size={20} className="text-blue-500" />
              {user?.email}
            </p>
            <p>{user?.gender}</p>
            <p>{user?.course}</p>
            <p>{user?.school}</p>
            <p>{user?.department}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
            <AiOutlineEdit size={20} className="inline-block mr-2" />
            Edit
          </button>
          <button onClick={logout} className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
            <AiOutlineLogout size={20} className="inline-block mr-2" />
            Logout
          </button>
          <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
            <AiOutlineDelete size={20} className="inline-block mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
