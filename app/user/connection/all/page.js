"use client"
import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdChat, MdShuffle, MdPeople } from "react-icons/md";

const ConnectionsPage = () => {
    const isLogged = useAuth()
    const router = useRouter()
    const [mockUsers, setMockUsers] = useState(null)

    const fetchUsers = async () => {
        const response = await fetch("/api/user/connection/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`,
            },
        })
        if (response.ok) {
            const users = await response.json()
            setMockUsers(users.requests)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">
        Find Your Connection 💕
      </h1>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all">
          <MdShuffle className="text-lg" /> Chat Random
        </button>
        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-all">
          <MdPeople className="text-lg" /> Match Random
        </button>
        <button className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-purple-600 transition-all">
          <MdChat className="text-lg" /> Connect All
        </button>
      </div>

      {/* Connections List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockUsers?.map((user) => (
          <div
            key={user.userId}
            onClick={()=>{router.push(`/user/profile/${user.userId}`)}}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-all"
            style={{ height: "320px" }}
          >
            {/* Avatar */}
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            ) : (
              <FaUserCircle className="text-gray-400 text-6xl mb-4" />
            )}

            {/* User Details */}
            <h2 className="text-lg font-bold text-gray-700">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.gender}</p>
            <p className="text-gray-500 text-sm">{user.course}</p>
            <p className="text-gray-500 text-sm">{user.department}</p>

            {/* Chat Button */}
            <button className="mt-auto flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-pink-600 transition-all">
              <MdChat /> Chat Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionsPage;
