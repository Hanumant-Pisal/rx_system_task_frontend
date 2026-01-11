import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginThunk } from "../../features/auth/authThunks";
import { ROUTES } from "../../utils/constants";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { status, error } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginThunk(form));
    if (res.meta.requestStatus === "fulfilled") {
      const role = res.payload.user.role;
      if (role === "admin") navigate(ROUTES.ADMIN_DASH);
      else if (role === "owner") navigate(ROUTES.OWNER_DASH);
      else navigate(ROUTES.STORES);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={submit}>
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <Button disabled={status === "loading"} type="submit" className="w-full">
          {status === "loading" ? "Signing in..." : "Login"}
        </Button>
      </form>
      <div className="mt-3 text-sm text-center">
        Don't have an account? <Link className="text-blue-600" to={ROUTES.SIGNUP}>Sign up</Link>
      </div>
      {location.state?.from && (
        <div className="text-xs text-gray-500 mt-2">Redirected from {location.state.from.pathname}</div>
      )}
    </AuthLayout>
  );
}
