import { useState } from "react";

export default function RatingStars({ value = 0, onChange, readOnly = false }) {
  const [hover, setHover] = useState(0);
  const star = (i) => {
    const filled = (hover || value) >= i;
    return (
      <button
        key={i}
        type="button"
        className="text-2xl"
        onMouseEnter={() => !readOnly && setHover(i)}
        onMouseLeave={() => !readOnly && setHover(0)}
        onClick={() => !readOnly && onChange?.(i)}
        aria-label={`Rate ${i}`}
      >
        {filled ? "★" : "☆"}
      </button>
    );
  };
  return <div className="flex gap-1">{[1, 2, 3, 4, 5].map(star)}</div>;
}
