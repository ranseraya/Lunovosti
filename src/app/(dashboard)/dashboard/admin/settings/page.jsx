"use client";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
        <p className="text-gray-600">
          This section is under construction. Future settings could include:
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-600">
          <li>Changing the site title and logo.</li>
          <li>Managing advertisement slots.</li>
          <li>
            Configuring API keys for third-party services (e.g., analytics).
          </li>
          <li>Managing categories and tags.</li>
        </ul>
      </div>
    </div>
  );
}
