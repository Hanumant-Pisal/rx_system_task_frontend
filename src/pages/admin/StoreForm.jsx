import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAppDispatch } from "../../app/hooks";
import { adminCreateStoreThunk } from "../../features/stores/storeThunks";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import ProtectedRoute from "../../components/ProtectedRoute";

function Inner() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "", ownerId: "" });
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(adminCreateStoreThunk({ ...form, ownerId: form.ownerId || null }));
    if (res.meta.requestStatus === "fulfilled") navigate(ROUTES.ADMIN_STORES);
    else setErr(res.payload || "Failed to create store");
  };

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto bg-white border rounded-2xl p-6">
        <h1 className="text-xl font-semibold mb-4">Create Store</h1>
        <form onSubmit={submit}>
          <Input label="Store Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email (optional)" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <Input label="Owner User ID (optional)" value={form.ownerId} onChange={(e) => setForm({ ...form, ownerId: e.target.value })} />
          {err && <p className="text-red-600 text-sm mb-2">{err}</p>}
          <Button type="submit" className="w-full">Create</Button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default function StoreForm() {
  return (
    <ProtectedRoute roles={["admin"]}>
      <Inner />
    </ProtectedRoute>
  );
}
