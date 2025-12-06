'use client'

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
  type KeyboardEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

// Context for dialog state
interface DialogContextValue {
  isOpen: boolean
  onClose: () => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

const useDialogContext = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog')
  }
  return context
}

// Animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const contentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.15,
    },
  },
}

// Reduced motion variants
const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

export interface DialogProps {
  /** Whether the dialog is open */
  isOpen: boolean
  /** Callback when the dialog should close */
  onClose: () => void
  /** Dialog content */
  children: ReactNode
}

/**
 * Dialog root component that provides context and manages portal rendering.
 */
export function Dialog({ isOpen, onClose, children }: DialogProps) {
  const [mounted, setMounted] = React.useState(false)

  // Handle mount for portal
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  if (!mounted) return null

  return createPortal(
    <DialogContext.Provider value={{ isOpen, onClose }}>
      <AnimatePresence mode="wait">{isOpen && children}</AnimatePresence>
    </DialogContext.Provider>,
    document.body
  )
}

// Need to import React for useState
import React from 'react'

export interface DialogOverlayProps {
  /** Additional class names */
  className?: string
}

/**
 * Dialog overlay/backdrop component with animation.
 */
export function DialogOverlay({ className }: DialogOverlayProps) {
  const { onClose } = useDialogContext()
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <motion.div
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        className
      )}
      variants={prefersReducedMotion ? reducedMotionVariants : overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      aria-hidden="true"
    />
  )
}

export interface DialogContentProps {
  /** Additional class names */
  className?: string
  /** Content of the dialog */
  children: ReactNode
  /** Size of the dialog */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const contentSizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
}

/**
 * Dialog content container with focus trap and keyboard handling.
 */
export function DialogContent({
  className,
  children,
  size = 'md',
}: DialogContentProps) {
  const { onClose } = useDialogContext()
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Handle escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  // Focus trap and initial focus
  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    // Store previous active element
    const previousActiveElement = document.activeElement as HTMLElement

    // Find first focusable element
    const focusableElements = content.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    // Focus first focusable element or the content itself
    if (firstFocusable) {
      firstFocusable.focus()
    } else {
      content.focus()
    }

    // Handle tab key for focus trap
    const handleTab = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable?.focus()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)

    return () => {
      document.removeEventListener('keydown', handleTab)
      // Restore focus on close
      previousActiveElement?.focus()
    }
  }, [])

  return (
    <motion.div
      ref={contentRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2',
        'bg-white rounded-2xl shadow-hard',
        'p-6 md:p-8',
        'focus:outline-none',
        contentSizes[size],
        className
      )}
      variants={prefersReducedMotion ? reducedMotionVariants : contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onKeyDown={handleKeyDown as unknown as React.KeyboardEventHandler}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  )
}

export interface DialogCloseButtonProps {
  /** Additional class names */
  className?: string
  /** Custom aria label */
  ariaLabel?: string
}

/**
 * Dialog close button component.
 */
export function DialogCloseButton({
  className,
  ariaLabel = 'Close dialog',
}: DialogCloseButtonProps) {
  const { onClose } = useDialogContext()

  return (
    <button
      type="button"
      onClick={onClose}
      className={cn(
        'absolute right-4 top-4',
        'p-2 rounded-lg',
        'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100',
        'transition-colors duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50',
        className
      )}
      aria-label={ariaLabel}
    >
      <svg
        className="h-5 w-5"
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
  )
}

export interface DialogTitleProps {
  /** Additional class names */
  className?: string
  /** Title content */
  children: ReactNode
}

/**
 * Dialog title component with proper heading semantics.
 */
export function DialogTitle({ className, children }: DialogTitleProps) {
  return (
    <h2
      className={cn(
        'text-title font-serif font-bold text-neutral-900',
        'pr-10', // Space for close button
        className
      )}
    >
      {children}
    </h2>
  )
}

export interface DialogDescriptionProps {
  /** Additional class names */
  className?: string
  /** Description content */
  children: ReactNode
}

/**
 * Dialog description component for additional context.
 */
export function DialogDescription({
  className,
  children,
}: DialogDescriptionProps) {
  return (
    <p className={cn('mt-2 text-body text-neutral-600', className)}>
      {children}
    </p>
  )
}

export interface DialogBodyProps {
  /** Additional class names */
  className?: string
  /** Body content */
  children: ReactNode
}

/**
 * Dialog body component for main content.
 */
export function DialogBody({ className, children }: DialogBodyProps) {
  return <div className={cn('mt-4', className)}>{children}</div>
}

export interface DialogFooterProps {
  /** Additional class names */
  className?: string
  /** Footer content (typically action buttons) */
  children: ReactNode
}

/**
 * Dialog footer component for action buttons.
 */
export function DialogFooter({ className, children }: DialogFooterProps) {
  return (
    <div
      className={cn(
        'mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Dialog
