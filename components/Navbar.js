"use client";
import { AuthProvider, useAuthContext } from "@/app/context/authContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu
  const { user, setUser } = useAuthContext(); // User context
  const router = useRouter(); // Router hook for navigation

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            alt="ShyConnect Logo"
            className="h-8 w-8"
          />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            ShyConnect
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 rtl:space-x-reverse text-gray-800 dark:text-gray-100">
          <li>
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/user/profile" className="hover:text-blue-600 dark:hover:text-blue-400">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/user/requests" className="hover:text-blue-600 dark:hover:text-blue-400">
              Requests
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
              About
            </Link>
          </li>
        </ul>

        {/* Login or User Info */}
        <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
          {user ? (
            <div onClick={() => router.push('/user/profile')} className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
              <AiOutlineUser size={24} className="text-gray-800 dark:text-gray-100" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {user.email}
              </span>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400 transition duration-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)} // Toggle menu
        >
          {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900">
          <ul className="flex flex-col space-y-4 px-4 py-6 text-gray-800 dark:text-gray-100">
            <li>
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/user/profile" className="hover:text-blue-600 dark:hover:text-blue-400">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/user/requests" className="hover:text-blue-600 dark:hover:text-blue-400">
                Requests
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
                About
              </Link>
            </li>
          </ul>

          {/* Mobile Login/User Info */}
          <div className="flex flex-col items-start px-4 py-3">
            {user ? (
              <div onClick={() => router.push('/user/profile')} className="flex items-center space-x-2 rtl:space-x-reverse">
                <AiOutlineUser size={24} className="text-gray-800 dark:text-gray-100" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {user.email}
                </span>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="w-full text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400 transition duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
