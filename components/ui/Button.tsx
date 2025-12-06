'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg'
  /** Shows loading spinner and disables the button */
  isLoading?: boolean
  /** Content to display on the left side of button text */
  leftIcon?: ReactNode
  /** Content to display on the right side of button text */
  rightIcon?: ReactNode
  /** Additional class names */
  className?: string
  /** Button content */
  children: ReactNode
}

const buttonVariants = {
  primary: [
    'bg-accent-red text-white',
    'hover:bg-accent-red-light hover:-translate-y-0.5 hover:shadow-hard',
    'active:translate-y-0 active:shadow-medium',
    'focus-visible:ring-accent-red/50',
  ].join(' '),
  secondary: [
    'bg-transparent border-2 border-primary-500 text-primary-500',
    'hover:bg-primary-500 hover:text-white hover:-translate-y-0.5',
    'active:translate-y-0',
    'focus-visible:ring-primary-500/50',
  ].join(' '),
  ghost: [
    'bg-transparent text-neutral-700',
    'hover:bg-neutral-100 hover:text-neutral-900',
    'active:bg-neutral-200',
    'focus-visible:ring-neutral-400/50',
  ].join(' '),
}

const buttonSizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
}

const LoadingSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

/**
 * Button component with multiple variants, sizes, and states.
 * Supports loading state with spinner, icons, and is fully accessible.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-sans font-semibold rounded-lg',
          'transition-all duration-200 motion-reduce:transition-none motion-reduce:hover:transform-none',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          // Variant styles
          buttonVariants[variant],
          // Size styles
          buttonSizes[size],
          // Disabled/Loading state
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <LoadingSpinner
            className={cn(
              size === 'sm' && 'h-4 w-4',
              size === 'md' && 'h-5 w-5',
              size === 'lg' && 'h-6 w-6'
            )}
          />
        )}
        {!isLoading && leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
