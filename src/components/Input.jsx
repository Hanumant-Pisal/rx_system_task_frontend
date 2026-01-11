export default function Input({ label, error, ...props }) {
    return (
      <div className="mb-3">
        {label && <label className="block text-sm mb-1">{label}</label>}
        <input
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:ring-gray-300"
          {...props}
        />
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>
    );
  }
  