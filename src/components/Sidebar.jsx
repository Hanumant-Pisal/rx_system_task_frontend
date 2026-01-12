import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ items = [] }) {
  const { pathname } = useLocation();
  
  const isActive = (path) => {
    return pathname.startsWith(path) && path !== '/admin';
  };

  return (
    <div className="w-64 lg:w-72 h-screen bg-gradient-to-b from-blue-600 to-blue-800 border-r border-gray-100 flex flex-col shadow-sm text-white">
      <div className="p-4 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-white">
          <Link to="/admin/dashboard">
            Review System
          </Link>
        </h2>
      </div>

      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {items.map(({ to, icon: Icon, label }) => {
            const active = isActive(to);
            
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-white hover:bg-blue-700'
                  }`}
                >
                  <span className={`flex items-center justify-center w-10 h-10 mr-3 rounded-lg ${
                    active ? 'bg-indigo-100' : 'bg-blue-700 bg-opacity-20'
                  }`}>
                    <Icon className="w-5 h-5 text-white" />
                  </span>
                  <span>{label}</span>
                  {active && (
                    <span className="ml-auto w-1.5 h-8 bg-indigo-600 rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

     
    </div>
  );
}
