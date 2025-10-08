import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main
        className="
          flex-1 
          p-6 
          bg-gray-50 dark:bg-gray-900 
          text-gray-900 dark:text-gray-100 
          transition-colors 
          min-h-screen
          lg:ml-64  /* Sidebar tetap memberi ruang di desktop */
        "
      >
        {children}
      </main>
    </div>
  );
}
