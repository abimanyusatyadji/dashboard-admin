import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/StatCard";
import UserGrowthChart from "../components/charts/UserGrowthChart";
import UserRolePieChart from "../components/charts/UserRolePieChart";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      fetch("/data/users.json")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          localStorage.setItem("users", JSON.stringify(data));
        })
        .catch((err) => console.error("Failed to load users:", err));
    }
  }, []);

  const totalUsers = users.length;
  const activeUsers = users.filter(
    (u) => u.role.toLowerCase() === "user"
  ).length;

  // Hitung berdasarkan bulan ini
  const newSignupsThisMonth = users.filter((u) => {
    const created = new Date(u.createdAt);
    const now = new Date();
    return (
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
    );
  }).length;

  // Hitung berdasarkan minggu ini
  const newSignupsThisWeek = users.filter((u) => {
    const created = new Date(u.createdAt);
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Minggu awal
    return created >= startOfWeek && created <= now;
  }).length;

  // Hitung berdasarkan 7 hari terakhir
  const newSignupsLast7Days = users.filter((u) => {
    const created = new Date(u.createdAt);
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);
    return created >= sevenDaysAgo && created <= now;
  }).length;

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Dashboard
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard title="Total Users" value={totalUsers} type="total" />
        <StatCard title="Active Users" value={activeUsers} type="active" />
        <StatCard
          title="New Signups (This Month)"
          value={newSignupsThisMonth}
          type="signup"
        />
        <StatCard
          title="New Signups (Last 7 Days)"
          value={newSignupsLast7Days}
          type="signup"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            User Growth
          </h3>
          <UserGrowthChart users={users} />
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            User Roles
          </h3>
          <UserRolePieChart users={users} />
        </div>
      </div>
    </AdminLayout>
  );
}
