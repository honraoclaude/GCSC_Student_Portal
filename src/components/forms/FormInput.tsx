import React from "react";
import { inputBase, inputError, formLabel, formErrorMessage, formHelperText, cn } from "@/styles";

interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}

export function FormInput({
  label,
  error,
  required,
  helperText,
  className,
  id,
  ...props
}: FormInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className={formLabel}
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}

      <input
        id={inputId}
        className={cn(error ? inputError : inputBase, className)}
        {...props}
      />

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
