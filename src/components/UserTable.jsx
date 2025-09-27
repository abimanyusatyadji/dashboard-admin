import { useState, useEffect } from "react";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const sortUsers = (users) => {
    if (!sortConfig.key) return users;
    return [...users].sort((a, b) => {
      let x = a[sortConfig.key].toString().toLowerCase();
      let y = b[sortConfig.key].toString().toLowerCase();
      if (x < y) return sortConfig.direction === "asc" ? -1 : 1;
      if (x > y) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = sortUsers(filteredUsers);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.role) return;
    const emailExists = users.some(
      (u) => u.email === newUser.email && u.id !== editingId
    );
    if (emailExists) {
      alert("Email sudah digunakan oleh user lain!");
      return;
    }

    if (isEditing) {
      setUsers(
        users.map((u) =>
          u.id === editingId ? { ...u, ...newUser, id: editingId } : u
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      const userToAdd = {
        id,
        ...newUser,
        createdAt: new Date().toISOString(),
      };
      setUsers([...users, userToAdd]);
    }

    setNewUser({ name: "", email: "", role: "" });
    setIsModalOpen(false);
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditingId(user.id);
    setNewUser({ name: user.name, email: user.email, role: user.role });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin mau hapus user ini?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-lg text-sm w-1/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            setIsEditing(false);
            setNewUser({ name: "", email: "", role: "" });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th
              className="text-left p-2 cursor-pointer select-none"
              onClick={() => requestSort("name")}
            >
              Name{" "}
              {sortConfig.key === "name" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="text-left p-2 cursor-pointer select-none"
              onClick={() => requestSort("email")}
            >
              Email{" "}
              {sortConfig.key === "email" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="text-left p-2 cursor-pointer select-none"
              onClick={() => requestSort("role")}
            >
              Role{" "}
              {sortConfig.key === "role" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sortedUsers.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
          No users found.
        </p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[400px] shadow-lg">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
              {isEditing ? "Edit User" : "Add New User"}
            </h2>
            <form onSubmit={handleAddUser}>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
                <select
                  className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value="">-- Select Role --</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
