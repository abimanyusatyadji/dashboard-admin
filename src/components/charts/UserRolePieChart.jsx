// src/components/charts/UserRolePieChart.jsx
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366F1", "#10B981"]; // Admin = biru, User = hijau

export default function UserRolePieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      const adminCount = users.filter((u) => u.role === "Admin").length;
      const userCount = users.filter((u) => u.role === "User").length;

      setData([
        { name: "Admin", value: adminCount },
        { name: "User", value: userCount },
      ]);
    }
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
