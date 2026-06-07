import React from "react";

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
          className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        className={`w-full rounded-lg border bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-all outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 dark:focus:ring-indigo-400 resize-none ${
          error
            ? "border-rose-500 dark:border-rose-500/50"
            : "border-slate-300 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-500"
        } ${className}`}
        {...props}
      />

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
