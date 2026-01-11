import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Table from "../../components/Table";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { adminFetchUsersThunk } from "../../features/admin/adminThunks";
import { ROUTES } from "../../utils/constants";
import ProtectedRoute from "../../components/ProtectedRoute";

function Inner() {
  const dispatch = useAppDispatch();
  const { users, usersLoading } = useAppSelector((s) => s.admin);
  const [filters, setFilters] = useState({ name: "", email: "", address: "", role: "" });

  useEffect(() => {
    dispatch(adminFetchUsersThunk(filters));
  }, [dispatch]);

  const submit = () => dispatch(adminFetchUsersThunk(filters));

  const cols = [
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "address", title: "Address" },
    { key: "role", title: "Role" },
  ];

  
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'owner': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  
  const columns = [
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "address", title: "Address" },
    {
      key: "role",
      title: "Role",
      render: (user) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      )
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Users</h1>

          </div>
        </div>


        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-10">
          <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-4">Filter Users</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
                placeholder="User name"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
                placeholder="User email"
                value={filters.email}
                onChange={(e) => setFilters({ ...filters, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
                placeholder="User address"
                value={filters.address}
                onChange={(e) => setFilters({ ...filters, address: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition bg-white"
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              >
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={submit}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 transition-all duration-300 text-white h-10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Apply Filters
              </Button>
            </div>

          </div>
        </div>



        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">All Users</h3>
            <div className="flex items-end ">

              <Link to={ROUTES.ADMIN_USERS_NEW}>
                <Button className="flex items-center gap-2 bg-black hover:bg-gray-900 transition-all duration-300 text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New User
                </Button>
              </Link>
            </div>
          </div>

          {usersLoading ? (
            <div className="p-8 flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <Table
              columns={columns}
              data={users}
              className="w-full"
              defaultSortField="name"
              defaultSortDirection="asc"
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default function UsersList() {
  return (
    <ProtectedRoute roles={["admin"]}>
      <Inner />
    </ProtectedRoute>
  );
}
