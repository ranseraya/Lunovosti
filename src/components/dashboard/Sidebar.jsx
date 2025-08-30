"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Articles", href: "/dashboard/admin/articles", icon: Newspaper },
  { name: "Users", href: "/dashboard/admin/users", icon: Users },
  { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col">
      <div className="h-20 flex items-center justify-center border-b border-gray-700">
        <Link href="/Home" className="text-2xl font-bold">
          LUNOVOSTI
        </Link>
      </div>
      <div className="flex-grow overflow-y-auto">
        <nav className="pr-6 py-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2 list-none">
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-orange-500 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="Admin"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-semibold">{session?.user?.name || "Admin"}</p>
            <p className="text-xs text-gray-400">{session?.user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/Home" })}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
