import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import UserTable from "../components/UserTable";

export default function Users() {
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

  return (
    <AdminLayout>
      {/* Judul Halaman */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 px-2 sm:px-0">
        Users
      </h2>

      {/* Card Wrapper */}
      <div className="p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow w-full overflow-hidden">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100">
          Latest Users
        </h3>

        {/* Table Component */}
        <div className="overflow-x-auto">
          <UserTable users={users} setUsers={setUsers} />
        </div>
      </div>
    </AdminLayout>
  );
}
