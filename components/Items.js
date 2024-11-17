"use client";
import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaUserCircle, FaSearch, FaHeart } from "react-icons/fa";

const Items = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const router = useRouter()
  const isLoggedIn = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
          "Content-Type": "application/json",
          }
        });

        if (response.ok) {
          const all_users = await response.json();
          setData(all_users);
          setFilteredData(all_users);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      const newFilteredData = data.filter((member) =>
        `${member.name} ${member.course} ${member.department}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredData(newFilteredData);
    }
  }, [searchTerm, data]);

  // Group members by school
  const groupedData = filteredData.reduce((acc, member) => {
    if (!acc[member.school]) acc[member.school] = [];
    acc[member.school].push(member);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <div className="flex items-center space-x-2 mb-6 p-2 border rounded-lg shadow-md bg-white">
        <FaSearch className="text-pink-500 text-lg" />
        <input
          type="text"
          placeholder="Search by name, course, or department..."
          className="w-full outline-none text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {Object.keys(groupedData).length > 0 ? (
        Object.entries(groupedData).map(([school, members]) => (
          <div key={school} className="mb-8">
            {/* School Heading */}
            <h2 className="text-2xl font-bold text-pink-500 mb-4">
              {school}
            </h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {members.map((member, idx) => (
                <div
                  key={idx}
                  onClick={() => router.push(`/user/profile/${member._id}`)}
                  className="relative bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg rounded-xl p-6 flex flex-col items-center min-w-[250px] max-w-[250px] h-[350px] transform transition-all hover:scale-105 cursor-pointer"
                >
                  {/* Heart Icon */}
                  <div className="absolute top-4 right-4 text-white bg-red-500 p-2 rounded-full shadow-md">
                    <FaHeart className="text-lg" />
                  </div>
                  {/* Profile Image or Icon */}
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                    {member.avataar ? (
                      <Image
                        src={member.avataar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="w-full h-full text-gray-200" />
                    )}
                  </div>
                  {/* Member Info */}
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-md">{member.course}</p>
                    <p className="text-sm">{member.department}</p>
                  </div>
                  {/* Action Button */}
                  <button className="mt-4 px-6 py-2 bg-white text-pink-500 rounded-full shadow-md font-medium hover:bg-pink-200">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No members found.</p>
      )}
    </div>
  );
};

export default Items;
