import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ items = [] }) {
  const loc = useLocation();
  
  
  const isActive = (path) => {
    return loc.pathname.startsWith(path) && path !== '/admin';
  };

  return (
    <div className="w-64 lg:w-72 h-screen bg-gradient-to-b from-blue-600 to-blue-800 border-r border-gray-100 flex flex-col shadow-sm text-white">
      <div className="p-4 flex items-center justify-between lg:justify-center">
        <h2 className="text-xl lg:text-2xl font-bold text-white">
          <Link to="/admin/dashboard" className="flex items-center">
            <span className="hidden lg:inline">Review System</span>
            <span className="lg:hidden">RS</span>
          </Link>
        </h2>
      </div>

      
      <nav className="flex-1 px-2 py-2 lg:px-3 lg:py-4 overflow-y-auto">
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center px-3 py-3 lg:px-4 text-sm lg:text-base font-medium rounded-lg transition-colors ${
                    active
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-white hover:bg-blue-700'
                  }`}
                >
                  <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 mr-3 rounded-lg ${
                    active ? 'bg-indigo-100' : 'bg-blue-700 bg-opacity-20'
                  }`}>
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </span>
                  <span className="truncate">{item.label}</span>
                  {active && (
                    <span className="ml-auto w-1.5 h-8 bg-indigo-600 rounded-full"></span>
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
