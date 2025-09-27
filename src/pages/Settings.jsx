import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";

export default function Settings() {
  const [tab, setTab] = useState("profile");

  // --- Profile ---
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("adminProfile");
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const saveProfile = () => {
    localStorage.setItem("adminProfile", JSON.stringify(profile));
    alert("Profile saved!");
  };

  // --- Roles & Permissions ---
  const defaultRoles = [
    { role: "Admin", dashboard: true, users: true, settings: true },
    { role: "Viewer", dashboard: true, users: false, settings: false },
  ];

  const [roles, setRoles] = useState(defaultRoles);

  useEffect(() => {
    const savedRoles = localStorage.getItem("roles");
    if (savedRoles) setRoles(JSON.parse(savedRoles));
  }, []);

  const togglePermission = (roleIndex, key) => {
    const newRoles = [...roles];
    newRoles[roleIndex][key] = !newRoles[roleIndex][key];
    setRoles(newRoles);
  };

  const saveRoles = () => {
    localStorage.setItem("roles", JSON.stringify(roles));
    alert("Roles & permissions saved!");
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Settings
      </h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["profile", "roles"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              tab === t
                ? "bg-blue-700 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            }`}
          >
            {t === "profile" ? "Profile" : "Roles & Permissions"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-gray-900 dark:text-gray-100">
        {tab === "profile" && (
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg"
              />
            </div>
            <button
              onClick={saveProfile}
              className="px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Save Profile
            </button>
          </div>
        )}

        {tab === "roles" && (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Role
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Dashboard
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Users
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Settings
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.map((r, i) => (
                  <tr
                    key={i}
                    className="text-center odd:bg-gray-50 dark:odd:bg-gray-900"
                  >
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                      {r.role}
                    </td>
                    {["dashboard", "users", "settings"].map((key) => (
                      <td
                        key={key}
                        className="border border-gray-300 dark:border-gray-700 px-4 py-2"
                      >
                        <input
                          type="checkbox"
                          checked={r[key]}
                          onChange={() => togglePermission(i, key)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={saveRoles}
              className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Save Roles & Permissions
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
