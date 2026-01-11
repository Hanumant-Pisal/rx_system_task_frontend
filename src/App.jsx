import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ChangePassword from "./pages/auth/ChangePassword";
import AdminChangePassword from "./pages/admin/ChangePassword";
import StoresList from "./pages/user/StoresList";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersList from "./pages/admin/UsersList";
import UserForm from "./pages/admin/UserForm";
import AdminStoresList from "./pages/admin/StoresList";
import StoreForm from "./pages/admin/StoreForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

     
      <Route path="/stores" element={<ProtectedRoute><StoresList /></ProtectedRoute>} />

      
      <Route path="/owner/dashboard" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />

      
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
      <Route path="/admin/users/new" element={<ProtectedRoute><UserForm /></ProtectedRoute>} />
      <Route path="/admin/stores" element={<ProtectedRoute><AdminStoresList /></ProtectedRoute>} />
      <Route path="/admin/stores/new" element={<ProtectedRoute><StoreForm /></ProtectedRoute>} />
      <Route path="/admin/change-password" element={<ProtectedRoute><AdminChangePassword /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
