/**
 * Barrel exports for all custom hooks
 * Enables easy importing: import { useForm, useApi, useAuth } from '@/hooks'
 */

export { useForm } from './useForm';
export type { UseFormOptions, UseFormReturn } from './useForm';

export { useApi } from './useApi';
export type { UseApiOptions, UseApiReturn } from './useApi';

export { useAuth, useRequireAuth, useRequireProfile } from './useAuth';

export { useXP, useStreak, useLevelProgress } from './useXP';
export type { UseXPOptions, XPState } from './useXP';
