import Navbar from "../components/Navbar";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto p-4">{children}</div>
      </main>
    </div>
  );
}
