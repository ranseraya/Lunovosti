"use client";

import { useState, useEffect } from "react";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newRole }),
      });
      fetchUsers();
    } catch (error) {
      alert("Failed to update role.");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Role</th>
              <th className="py-3 px-6 text-left">Joined</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 font-medium">{user.username}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 text-center">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="editor">Editor</option>
                    <option value="author">Author</option>
                    <option value="subscriber">Subscriber</option>
                    <option value="premium">Premium</option>
                  </select>
                </td>
                <td className="py-3 px-6">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
