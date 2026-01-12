import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ROUTES } from "../utils/constants";
import { Home, Users, Store, Settings, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
  const items = [
    { label: "Dashboard", to: ROUTES.ADMIN_DASH, icon: Home },
    { label: "Users", to: ROUTES.ADMIN_USERS, icon: Users },
    { label: "Stores", to: ROUTES.ADMIN_STORES, icon: Store },
    { label: "Settings", to: ROUTES.ADMIN_CHANGE_PASSWORD, icon: Settings },
  ];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Mobile sidebar backdrop */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        
        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static lg:inset-0 z-30 transition-transform duration-200 ease-in-out`}
        >
          <Sidebar items={items} />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white shadow-sm z-10">
            <div className="flex items-center px-4 py-3">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Navbar />
            </div>
          </div>
          
          <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
