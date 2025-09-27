// src/components/charts/UserGrowthChart.jsx
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

export default function UserGrowthChart() {
  const [range, setRange] = useState("Weekly");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (!savedUsers) return;

    const users = JSON.parse(savedUsers);

    // Pastikan setiap user punya createdAt
    const usersWithDate = users.map((u) => ({
      ...u,
      createdAt: u.createdAt ? new Date(u.createdAt) : new Date(),
    }));

    if (range === "Weekly") {
      // Ambil 7 hari terakhir
      const days = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return format(date, "EEE"); // Mon, Tue, ...
      });

      const data = days.map((day, i) => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() - (6 - i));
        const count = usersWithDate.filter(
          (u) =>
            format(u.createdAt, "yyyy-MM-dd") ===
            format(targetDate, "yyyy-MM-dd")
        ).length;
        return { name: day, users: count };
      });

      setChartData(data);
    }

    if (range === "Monthly") {
      // Ambil 4 minggu terakhir
      const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
      const now = new Date();

      const data = weeks.map((label, idx) => {
        const start = new Date(now);
        start.setDate(now.getDate() - (28 - idx * 7));

        const end = new Date(start);
        end.setDate(start.getDate() + 6);

        const count = usersWithDate.filter(
          (u) => u.createdAt >= start && u.createdAt <= end
        ).length;

        return { name: label, users: count };
      });

      setChartData(data);
    }
  }, [range]);

  return (
    <div>
      <div className="flex justify-end mb-2">
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border rounded-md p-1 text-sm focus:ring focus:border-indigo-500"
        >
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#6366F1"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
