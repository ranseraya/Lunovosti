"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { BellIcon, Newspaper, UserPlus } from "lucide-react";
import Link from "next/link";

const getIconForType = (type) => {
  switch (type) {
    case "NEW_ARTICLE":
      return <Newspaper className="h-5 w-5 text-blue-500" />;
    case "FOLLOW":
      return <UserPlus className="h-5 w-5 text-green-500" />;
    default:
      return null;
  }
};

export default function NotificationBell() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const fetchNotifications = async () => {
    if (!session) return;
    try {
      const response = await fetch("/api/notifications");
      if (response.ok) {
        setNotifications(await response.json());
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [session]);

  const handleBellClick = async () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      await fetch("/api/notifications", { method: "PUT" });
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session) {
    return (
      <div
        className="h-10 w-10 border border-gray-400 flex justify-center items-center rounded-full overflow-hidden cursor-pointer hover:bg-gray-100 transition"
        aria-label="Notifications"
      >
        <BellIcon size={20} className="text-gray-600" />
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleBellClick}
        className="relative h-10 w-10 border border-gray-400 flex justify-center items-center rounded-full hover:bg-gray-100 transition"
        aria-label="Notifications"
      >
        <BellIcon size={20} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
          <div className="p-2 font-bold border-b">Notifications</div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((n) => {
                const href =
                  n.type === "NEW_ARTICLE" || n.type === "COMMENT_REPLY"
                    ? `/article/${n.article?.slug}`
                    : "#";

                return (
                  <Link key={n.id} href={href} passHref>
                    <div
                      onClick={() => href !== "#" && setIsOpen(false)}
                      className={`flex items-start gap-3 px-4 py-3 text-sm hover:bg-gray-100 ${
                        href === "#" ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getIconForType(n.type)}
                      </div>
                      <div className="flex-grow">
                        <p className="text-gray-800">{n.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(n.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="p-4 text-sm text-gray-500">No new notifications.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
