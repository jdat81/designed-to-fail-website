'use client'

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

// Toast types
export type ToastType = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

type ToastInput = Omit<Toast, 'id'>

// Context
interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: ToastInput) => string
  removeToast: (id: string) => void
  removeAllToasts: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

/**
 * Hook to access toast functionality.
 * Must be used within a ToastProvider.
 */
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Animation variants
const toastVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.2,
    },
  },
}

// Reduced motion variants
const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

// Toast type styles
const toastTypeStyles: Record<ToastType, string> = {
  default: 'border-neutral-200 bg-white',
  success: 'border-emerald-200 bg-emerald-50',
  warning: 'border-amber-200 bg-amber-50',
  error: 'border-red-200 bg-red-50',
  info: 'border-blue-200 bg-blue-50',
}

const toastIconColors: Record<ToastType, string> = {
  default: 'text-neutral-500',
  success: 'text-emerald-600',
  warning: 'text-amber-600',
  error: 'text-red-600',
  info: 'text-blue-600',
}

// Toast icons
const ToastIcon = ({ type }: { type: ToastType }) => {
  const colorClass = toastIconColors[type]

  switch (type) {
    case 'success':
      return (
        <svg
          className={cn('h-5 w-5', colorClass)}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )
    case 'error':
      return (
        <svg
          className={cn('h-5 w-5', colorClass)}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )
    case 'warning':
      return (
        <svg
          className={cn('h-5 w-5', colorClass)}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      )
    case 'info':
      return (
        <svg
          className={cn('h-5 w-5', colorClass)}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    default:
      return null
  }
}

// Individual toast component
interface ToastItemProps {
  toast: Toast
  onDismiss: () => void
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const { type, title, description, duration = 5000, action } = toast
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Auto-dismiss timer
  useEffect(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(onDismiss, duration)
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
      }
    }
  }, [duration, onDismiss])

  // Pause timer on hover
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  const handleMouseLeave = () => {
    if (duration > 0) {
      timerRef.current = setTimeout(onDismiss, duration)
    }
  }

  return (
    <motion.div
      layout
      variants={prefersReducedMotion ? reducedMotionVariants : toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      role="alert"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-medium',
        toastTypeStyles[type]
      )}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {type !== 'default' && (
            <div className="flex-shrink-0">
              <ToastIcon type={type} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-neutral-900">{title}</p>
            {description && (
              <p className="mt-1 text-sm text-neutral-600">{description}</p>
            )}
            {action && (
              <button
                type="button"
                onClick={() => {
                  action.onClick()
                  onDismiss()
                }}
                className="mt-2 text-sm font-medium text-primary-500 hover:text-primary-600 focus:outline-none focus-visible:underline"
              >
                {action.label}
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className={cn(
              'flex-shrink-0 rounded-md p-1.5',
              'text-neutral-400 hover:text-neutral-600',
              'transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50'
            )}
            aria-label="Dismiss notification"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export interface ToastProviderProps {
  /** Position of the toast container */
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center'
  /** Maximum number of toasts to show at once */
  maxToasts?: number
  /** Additional class names for the container */
  className?: string
  /** Application content */
  children: ReactNode
}

const positionStyles: Record<string, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
}

/**
 * Toast provider component that manages toast state and renders toast container.
 * Wrap your application with this provider to enable toast notifications.
 */
export function ToastProvider({
  position = 'bottom-right',
  maxToasts = 5,
  className,
  children,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const addToast = useCallback(
    (toast: ToastInput): string => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const newToast: Toast = { ...toast, id }

      setToasts((prev) => {
        const updated = [...prev, newToast]
        // Limit to maxToasts
        if (updated.length > maxToasts) {
          return updated.slice(-maxToasts)
        }
        return updated
      })

      return id
    },
    [maxToasts]
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const removeAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, removeAllToasts }}
    >
      {children}
      {mounted &&
        createPortal(
          <div
            className={cn(
              'fixed z-50 flex flex-col gap-3 pointer-events-none',
              positionStyles[position],
              className
            )}
            aria-label="Notifications"
          >
            <AnimatePresence mode="popLayout">
              {toasts.map((toast) => (
                <ToastItem
                  key={toast.id}
                  toast={toast}
                  onDismiss={() => removeToast(toast.id)}
                />
              ))}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  )
}

// Convenience functions for common toast types
export const toast = {
  show: (options: ToastInput) => {
    // This is a placeholder - actual implementation requires context
    console.warn('Toast called outside of ToastProvider')
    return ''
  },
  success: (title: string, description?: string) => ({
    type: 'success' as const,
    title,
    description,
  }),
  error: (title: string, description?: string) => ({
    type: 'error' as const,
    title,
    description,
  }),
  warning: (title: string, description?: string) => ({
    type: 'warning' as const,
    title,
    description,
  }),
  info: (title: string, description?: string) => ({
    type: 'info' as const,
    title,
    description,
  }),
}

export default ToastProvider
