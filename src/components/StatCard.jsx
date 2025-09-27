// src/components/StatCard.jsx
import { User, Users, UserPlus } from "lucide-react";

const icons = {
  total: <Users className="w-6 h-6 text-indigo-600" />,
  active: <User className="w-6 h-6 text-green-600" />,
  signup: <UserPlus className="w-6 h-6 text-blue-600" />,
};

export default function StatCard({ title, value, type }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow flex items-center gap-4 transition hover:shadow-lg hover:scale-[1.01]">
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
        {icons[type]}
      </div>
      <div>
        <h4 className="text-gray-500 dark:text-gray-400 text-sm">{title}</h4>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </p>
      </div>
    </div>
  );
}
