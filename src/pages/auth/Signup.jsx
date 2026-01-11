import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signupThunk } from "../../features/auth/authThunks";
import { validators, validate } from "../../utils/validators";
import { ROUTES } from "../../utils/constants";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { status, error } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const v = validate(form, {
      name: validators.name,
      email: validators.email,
      address: validators.address,
      password: validators.password,
    });
    setErrors(v);
    if (Object.keys(v).length) return;
    const res = await dispatch(signupThunk(form));
    if (res.meta.requestStatus === "fulfilled") {
      navigate(ROUTES.STORES);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-xl font-semibold mb-4">Sign up</h1>
      <form onSubmit={submit}>
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
        <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} error={errors.address} />
        <div className="relative">
          <Input 
            label="Password" 
            type={showPassword ? "text" : "password"} 
            value={form.password} 
            onChange={(e) => setForm({ ...form, password: e.target.value })} 
            error={errors.password} 
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
          {status === "loading" ? "Creating..." : "Create account"}
        </Button>
      </form>
      <div className="mt-3 text-sm text-center">
              Already have an account? <Link className="text-blue-600" to={ROUTES.LOGIN}>Log In</Link>
            </div>
    </AuthLayout>
  );
}
