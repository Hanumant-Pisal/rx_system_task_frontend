export default function AuthLayout({ children }) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-50">
        <div className="w-full max-w-md bg-white border rounded-2xl p-6 shadow">
          {children}
        </div>
      </div>
    );
  }
  