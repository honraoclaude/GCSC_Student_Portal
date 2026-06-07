import React from "react";
import { inputBase, inputError, formLabel, formErrorMessage, formHelperText, cn } from "@/styles";

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
          className={formLabel}
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}

      <select
        id={selectId}
        className={cn(
          error ? inputError : inputBase,
          "appearance-none cursor-pointer",
          className
        )}
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
        <p className={formErrorMessage}>
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className={formHelperText}>
          {helperText}
        </p>
      )}
    </div>
  );
}
