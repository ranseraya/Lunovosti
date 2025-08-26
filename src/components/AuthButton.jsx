"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import fotoProfile from "@/assets/profile.jpg";

const getDashboardPathForRole = (role) => {
  if (!role) return "/";
  const userRole = role.toUpperCase();
  if (["ADMIN", "EDITOR", "AUTHOR"].includes(userRole)) {
    return "/admin/dashboard";
  }
  return "/Home";
};

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
    );
  }

  if (session) {
    const dashboardPath = getDashboardPathForRole(session.user?.role);

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          <Image
            src={session.user?.image || fotoProfile}
            alt={session.user?.name || "User Profile"}
            fill
            style={{ objectFit: "cover" }}
          />
        </button>

        {isOpen && (
          <div className="dropdown-menu absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session.user?.name || "User"}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {session.user?.email}
              </p>
            </div>
            <div className="py-1">
              <Link href={dashboardPath} passHref>
                <span
                  onClick={() => setIsOpen(false)}
                  className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Dashboard
                </span>
              </Link>
            </div>
            <div className="py-1">
              <Link href={"/profile"} passHref>
                <span
                  onClick={() => setIsOpen(false)}
                  className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Profile
                </span>
              </Link>
            </div>
            <div className="py-1 border-t border-gray-200">
              <Link href={"/profile/bookmarks"} passHref>
                <span
                  onClick={() => setIsOpen(false)}
                  className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  My Bookmarks
                </span>
              </Link>
            </div>
            <div className="py-1">
              <Link href={"/help"} passHref>
                <span
                  onClick={() => setIsOpen(false)}
                  className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Help
                </span>
              </Link>
            </div>
            <div className="py-1 border-t border-gray-200">
              <span
                onClick={() => {
                  setIsOpen(false);
                  signOut({ callbackUrl: "/Home" });
                }}
                className="dropdown-item block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
              >
                Logout
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="bg-orange-500 font-bold text-white text-base px-6 h-10 rounded-full shadow-md hover:bg-orange-600 transition"
    >
      Login
    </button>
  );
}
