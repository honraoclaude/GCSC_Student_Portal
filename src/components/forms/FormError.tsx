interface FormErrorProps {
  error?: string;
  className?: string;
}

export function FormError({ error, className }: FormErrorProps) {
  if (!error) return null;

  return (
    <div
      className={`rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 px-4 py-3 ${className}`}
    >
      <p className="text-sm font-medium text-rose-800 dark:text-rose-200">
        {error}
      </p>
    </div>
  );
}
