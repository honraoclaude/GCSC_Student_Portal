import React from "react";
import { inputBase, inputError, formLabel, formErrorMessage, formHelperText, cn } from "@/styles";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}

export function FormTextarea({
  label,
  error,
  required,
  helperText,
  className,
  id,
  rows = 3,
  ...props
}: FormTextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className={formLabel}
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          error ? inputError : inputBase,
          "resize-none",
          className
        )}
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
