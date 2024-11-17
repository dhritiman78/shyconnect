"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaHeart,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaVenusMars,
  FaCity,
} from "react-icons/fa";
import { toast } from "react-toastify";


const RegisterCard = () => {
    const router = useRouter()
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    location: "",
    school: "",
    course: "",
    department: "",
    bio: "",
  });
  const [submittingStatus , setsubmittingStatus] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setsubmittingStatus(true)
    const response = await fetch('/api/auth/register',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formInput)
    })
    
    if (response.status === 201) {
        const data = await response.json();
        setsubmittingStatus(false);
        router.push('/auth/login')
        toast.success("Registration successful! 🎉"); // Show success message
      } else {
        setsubmittingStatus(false);
        toast.error("Registration failed. Please try again!"); // Show error message
      }

    console.log(formInput); // Handle the form submission logic here
  };

  return (
    <div className="min-h-screen max-sm:px-3 py-12 flex items-center justify-center bg-pink-50 dark:bg-gray-900">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="text-center">
          <FaHeart className="text-pink-500 text-4xl mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Join ShyConnect ❤️
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create your profile and find your perfect match!
          </p>
        </div>

        {/* Form */}
        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                id="name"
                name="name"
                value={formInput.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <div className="relative mt-1">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                id="email"
                name="email"
                value={formInput.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          </div>

          {/* Password */}
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
                value={formInput.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Date of Birth
            </label>
            <div className="relative mt-1">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="date"
                id="dob"
                name="dob"
                value={formInput.dob}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Gender
            </label>
            <div className="relative mt-1">
              <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <select
                id="gender"
                name="gender"
                value={formInput.gender}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Location
            </label>
            <div className="relative mt-1">
              <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                id="location"
                name="location"
                value={formInput.location}
                onChange={handleChange}
                placeholder="Your City"
                className="w-full pl-10 pr-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          </div>

          {/* School */}
          <div className="mb-4">
            <label
              htmlFor="school"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              School
            </label>
            <select
              id="school"
              name="school"
              value={formInput.school}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="" disabled>Select School</option>
              <option value="Engineering">School of Engineering</option>
              <option value="Science">School of Science</option>
              <option value="Humanities">School of Humanities & Social Sciences</option>
              <option value="Management">School of Management Sciences</option>
            </select>
          </div>

          {/* Course */}
          <div className="mb-4">
            <label
              htmlFor="course"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Course
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formInput.course}
              onChange={handleChange}
              placeholder="B.Tech"
              className="w-full pl-3 pr-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Department */}
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formInput.department}
              onChange={handleChange}
              placeholder="Computer Science"
              className="w-full pl-3 pr-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formInput.bio}
              onChange={handleChange}
              placeholder="Write a short bio"
              rows="4"
              className="w-full pl-3 pr-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-pink-500 text-white font-bold rounded-lg focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 hover:bg-pink-600"
          >
            {(submittingStatus)?"Creating ...":"Sign Up and Start Matching"} 💕
          </button>
        </form>
         {/* Footer */}
         <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-pink-500 hover:underline dark:text-pink-400"
            >
              Login!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
