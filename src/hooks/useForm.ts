/**
 * Generic form hook for handling create/edit flows
 * Handles state, validation, dirty tracking, touch tracking, and submission
 */

import { useState, useCallback } from 'react';

export interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isDirty: boolean;
  setFieldValue: (field: keyof T, value: any) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (field: keyof T) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
}

export function useForm<T extends Record<string, any>>(
  options: UseFormOptions<T>
): UseFormReturn<T> {
  const { initialValues, onSubmit, validate } = options;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if form has changed from initial values
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  // Set a single field value
  const setFieldValue = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  // Handle change events from form inputs
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target as any;

      // Handle checkbox inputs
      if (type === 'checkbox') {
        setFieldValue(name as keyof T, (e.target as HTMLInputElement).checked);
      } else {
        setFieldValue(name as keyof T, value);
      }
    },
    [setFieldValue]
  );

  // Mark a field as touched and validate it
  const handleBlur = useCallback(
    (field: keyof T) => {
      setTouched((prev) => ({
        ...prev,
        [field]: true,
      }));

      // Validate just this field if validator provided
      if (validate) {
        const newErrors = validate(values);
        setErrors((prev) => ({
          ...prev,
          [field]: newErrors[field],
        }));
      }
    },
    [values, validate]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce(
        (acc, key) => {
          acc[key as keyof T] = true;
          return acc;
        },
        {} as Partial<Record<keyof T, boolean>>
      );
      setTouched(allTouched);

      // Validate all fields
      if (validate) {
        const newErrors = validate(values);
        setErrors(newErrors);

        // Stop if there are errors
        if (Object.keys(newErrors).length > 0) {
          return;
        }
      }

      // Submit
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit]
  );

  // Reset form to initial values
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isDirty,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
