import Navbar from "../components/Navbar";

export default function OwnerLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-72xl mx-auto p-6">{children}</div>
    </div>
  );
}
