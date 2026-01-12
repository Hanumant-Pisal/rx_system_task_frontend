import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Button from "./Button";
import { logoutThunk } from "../features/auth/authThunks";
import { ROUTES } from "../utils/constants";
import { useState, useEffect } from "react";
import { FiUser, FiChevronDown, FiLogOut, FiKey, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(logoutThunk());
    navigate(ROUTES.LOGIN);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between p-4">
        {!user || user.role !== 'admin' ? (
          <Link 
            to={user?.role === 'owner' ? ROUTES.OWNER_DASH : ROUTES.HOME}
            className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors ml-6"
          >
            Review System
          </Link>
        ) : (
          <div></div> 
        )}
        <div className="flex items-center gap-6 mr-6">
          {user && (
            <>   
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiUser className="text-blue-600" size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                    {user.name ? (user.name.length > 8 ? `${user.name.substring(0, 8)}...` : user.name) : 'Profile'}
                  </span>
                  <FiChevronDown className={`text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} size={16} />
                </button>
                
                
                {isDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900 truncate"></p>
                      <div className="flex items-center justify-between">
                      
                        <span className=" inline-flex flex items-center justify-center  text-white px-2.5 py-0.5 rounded text-xm font-medium bg-gray-500 w-full">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    {user.role !== 'admin' && (
                      <Link 
                        to={ROUTES.CHANGE_PASSWORD}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FiKey className="mr-2" /> Change Password
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiLogOut className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {!user && (
            <Link 
              to={ROUTES.LOGIN}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      
    </div>
  );
}
