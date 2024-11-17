"use client";
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineMessage, AiOutlineBlock, AiOutlineLink, AiOutlineDisconnect } from "react-icons/ai";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

const ProfilePage = () => {
  const isLoggedIn = useAuth();
  const router = useRouter();
  const { id } = useParams(); // Correct way to get the dynamic route parameter
  const [user, setUser] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("none"); // 'none', 'pending', or 'connected'

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/user/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data);

            // Check connection status
            const connectionCheck = await fetch(`/api/user/connection/status/${id}`, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`,
              },
            });

            if (connectionCheck.ok) {
              const status = await connectionCheck.json();
              setConnectionStatus(status.connection); // 'none', 'pending', or 'connected'
            }
          } else {
            toast.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Something went wrong!");
        }
      }
    };

    fetchData();
  }, [id]);

  const handleConnection = async () => {
    try {
      const response = await fetch(`/api/user/connection/request/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Successfully sent the connection request!");
        setConnectionStatus("pending");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send connection request!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong!");
    }
  };

  const handleDisconnect = async () => {
    try {
      const response = await fetch(`/api/user/connection/disconnect/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      });

      if (response.ok) {
        toast.success("Connection successfully removed!");
        setConnectionStatus("none");
      } else {
        toast.error("Failed to disconnect!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

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
        <div className="flex flex-col gap-4">
          {/* Direct Message */}
          <button
            disabled={connectionStatus !== "accepted"}
            className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg shadow-md 
              ${connectionStatus === "accepted" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
          >
            <AiOutlineMessage size={20} />
            {connectionStatus === "accepted" ? "Direct Message" : "Message Disabled"}
          </button>

          {/* Connect / Disconnect */}
          {connectionStatus === "none" && (
            <button
              onClick={handleConnection}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg shadow-md bg-green-500 text-white hover:bg-green-600"
            >
              <AiOutlineLink size={20} />
              Connect
            </button>
          )}
          {connectionStatus === "pending" && (
            <button
              disabled
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg shadow-md bg-yellow-500 text-gray-800 cursor-not-allowed"
            >
              <AiOutlineLink size={20} />
              Connection Pending
            </button>
          )}
          {connectionStatus === "accepted" && (
            <button
              onClick={handleDisconnect}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg shadow-md bg-red-500 text-white hover:bg-red-600"
            >
              <AiOutlineDisconnect size={20} />
              Disconnect
            </button>
          )}

          {/* Block */}
          <button className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg shadow-md bg-gray-500 text-white hover:bg-gray-600">
            <AiOutlineBlock size={20} />
            Block
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
