export default function Button({ children, className = "", ...props }) {
    return (
      <button
        className={`px-4 py-2 rounded-lg border bg-gray-900 text-white hover:opacity-90 disabled:opacity-60 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  