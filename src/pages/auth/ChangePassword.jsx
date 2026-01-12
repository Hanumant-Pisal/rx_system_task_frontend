import { useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAppDispatch } from "../../app/hooks";
import { changePasswordThunk } from "../../features/auth/authThunks";
import { validators } from "../../utils/validators";

export default function ChangePassword() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();

  const submit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }
    if (!validators.password(form.newPassword)) {
      setError("Password must be 8–16 chars, include 1 uppercase and 1 special character.");
      return;
    }
    setError(null);
    const { confirmPassword, ...passwordData } = form; 
    const res = await dispatch(changePasswordThunk(passwordData));
    if (res.meta.requestStatus === "fulfilled") setMsg("Password updated successfully.");
    else setError(res.payload || "Failed to update password");
  };

  return (
    <UserLayout>
      <div className="max-w-md mx-auto bg-white border rounded-2xl p-6">
        <button 
          onClick={() => window.history.back()} 
          className="mb-4 text-blue-600 hover:underline flex items-center"
        >
          ← Back
        </button>
        <h1 className="text-xl font-semibold mb-4">Change Password</h1>
        <form onSubmit={submit}>
          <Input label="Current Password" type="password" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} />
          <Input label="New Password" type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
          <Input label="Confirm New Password" type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          {msg && <p className="text-green-600 text-sm mb-2">{msg}</p>}
          <Button type="submit" className="w-full">Update</Button>
        </form>
      </div>
    </UserLayout>
  );
}
