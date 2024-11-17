"use client";
import { useAuth } from "@/app/hooks/useAuth";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const isLoggedIn = useAuth();
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/user/connection/request/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      });
      if (response.ok) {
        const { requests } = await response.json();
        setRequests(requests);
      } else {
        toast.error("Failed to fetch requests!");
      }
    } catch (error) {
      console.error("Error fetching requests:", error.message);
      toast.error("Failed to fetch requests!");
    }
  }
  useEffect(() => {
    if (isLoggedIn) {
      fetchRequests();
    }
  }, [isLoggedIn]);

  const handleAccept = async (id) => {
    const response = await fetch(`/api/user/connection/request/accept/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });
    if (response.ok) {
      fetchRequests()
      toast.success("Request Accepted!");
    } else {
      toast.error("Failed to accept request!");
    }
  };

  const handleReject = async (id) => {
    const response = await fetch(`/api/user/connection/request/reject/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });
    if (response.ok) {
      fetchRequests()
      toast.success("Request Rejected!");
    } else {
      toast.error("Failed to reject request!");
    }
  };

  return (
    <div className="min-h-screen max-sm:px-3 bg-gradient-to-b from-pink-500 to-purple-500 flex items-center justify-center">
      <div className="w-full max-w-3xl p-4 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">
          Requests
        </h1>
        <div className="space-y-4">
          {requests.map((request) => (
            <div
            key={request.userId} // Use a unique identifier here
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition"
          >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16">
                  {request.avatar ? (
                    <Image
                      src={request.avatar}
                      alt={request.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-6xl text-gray-400" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {request.name}
                  </h2>
                  <p className="text-sm text-gray-600">{request.department}</p>
                  <p className="text-sm text-gray-600">{request.course}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAccept(request.userId)}
                  className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                >
                  <AiOutlineCheck className="text-2xl" />
                </button>
                <button
                  onClick={() => handleReject(request.userId)}
                  className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <AiOutlineClose className="text-2xl" />
                </button>
              </div>
            </div>
          ))}
          {requests.length === 0 && (
            <p className="text-center text-gray-500 text-lg">
              No pending requests. 💌
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
