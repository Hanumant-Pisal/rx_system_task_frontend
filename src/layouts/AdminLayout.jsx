import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ROUTES } from "../utils/constants";
import { Home, Users, Store, Settings } from 'lucide-react';

export default function AdminLayout({ children }) {
  const items = [
    { label: "Dashboard", to: ROUTES.ADMIN_DASH, icon: Home },
    { label: "Users", to: ROUTES.ADMIN_USERS, icon: Users },
    { label: "Stores", to: ROUTES.ADMIN_STORES, icon: Store },
    { label: "Settings", to: ROUTES.ADMIN_CHANGE_PASSWORD, icon: Settings },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        <Sidebar items={items} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
