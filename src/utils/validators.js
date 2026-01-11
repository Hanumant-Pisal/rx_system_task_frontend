export const validators = {
    name: (v) => typeof v === "string" && v.trim().length >= 20 && v.trim().length <= 60,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    address: (v) => (v || "").length <= 400,
    password: (v) =>
      typeof v === "string" &&
      v.length >= 8 &&
      v.length <= 16 &&
      /[A-Z]/.test(v) &&
      /[^A-Za-z0-9]/.test(v),
  };
  
  export function validate(fields, rules) {
    const errors = {};
    Object.keys(rules).forEach((k) => {
      const ok = rules[k](fields[k]);
      if (!ok) errors[k] = `Invalid ${k}`;
    });
    return errors;
  }
  