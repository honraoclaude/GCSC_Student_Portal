import React from "react";

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
}

export function FormSelect({
  label,
  error,
  required,
  helperText,
  options,
  className,
  id,
  ...props
}: FormSelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}

      <select
        id={selectId}
        className={`w-full rounded-lg border bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white transition-all outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 dark:focus:ring-indigo-400 appearance-none cursor-pointer ${
          error
            ? "border-rose-500 dark:border-rose-500/50"
            : "border-slate-300 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-500"
        } ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          paddingRight: "36px",
        }}
        {...props}
      >
        <option value="">
          {label ? `Select ${label.toLowerCase()}` : "Select an option"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-2 text-sm font-medium text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      )}
    </div>
  );
}
