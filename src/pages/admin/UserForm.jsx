import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAppDispatch } from "../../app/hooks";
import { adminCreateUserThunk } from "../../features/admin/adminThunks";
import { validators, validate } from "../../utils/validators";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import ProtectedRoute from "../../components/ProtectedRoute";

function Inner() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "", role: "user" });
  const [errors, setErrors] = useState({});
  const [err, setErr] = useState(null);

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

    const res = await dispatch(adminCreateUserThunk(form));
    if (res.meta.requestStatus === "fulfilled") navigate(ROUTES.ADMIN_USERS);
    else setErr(res.payload || "Failed to create user");
  };

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto bg-white border rounded-2xl p-6">
        <h1 className="text-xl font-semibold mb-4">Create User</h1>
        <form onSubmit={submit}>
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
          <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} error={errors.address} />
          <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} />
          <div className="mb-3">
            <label className="block text-sm mb-1">Role</label>
            <select className="border px-3 py-2 rounded-lg w-full" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="user">User</option>
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {err && <p className="text-red-600 text-sm mb-2">{err}</p>}
          <Button type="submit" className="w-full">Create</Button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default function UserForm() {
  return (
    <ProtectedRoute roles={["admin"]}>
      <Inner />
    </ProtectedRoute>
  );
}
