import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ items = [] }) {
  const loc = useLocation();
  
  
  const isActive = (path) => {
    return loc.pathname.startsWith(path) && path !== '/admin';
  };

  return (
    <div className="w-72 h-screen bg-gray-300 border-r border-gray-100 flex flex-col shadow-sm">
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center mt-6">
         
          <Link to="/admin/dashboard" className="font-semibold">Admin Dashboard</Link>
        </h2>
      </div>

      
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    active
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className={`flex items-center justify-center w-10 h-10 mr-3 rounded-lg ${
                    active ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500'
                  }`}>
                    <Icon className={`w-5 h-5 ${active ? 'text-indigo-600' : 'text-gray-500'}`} />
                  </span>
                  {item.label}
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
