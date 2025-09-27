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
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Users
      </h2>

      {/* Card Wrapper */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Latest Users
        </h3>
        <UserTable users={users} setUsers={setUsers} />
      </div>
    </AdminLayout>
  );
}
