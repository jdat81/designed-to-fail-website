'use client'

import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant of the badge */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  /** Size of the badge */
  size?: 'sm' | 'md' | 'lg'
  /** Makes the badge rounded/pill shaped */
  rounded?: boolean
  /** Additional class names */
  className?: string
  /** Badge content */
  children: ReactNode
}

const badgeVariants = {
  default: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  primary: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
  secondary: 'bg-secondary-500/10 text-secondary-700 border-secondary-500/20',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
}

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
}

/**
 * Badge component for displaying status, labels, or counts.
 * Supports multiple color variants and sizes.
 */
export function Badge({
  variant = 'default',
  size = 'md',
  rounded = true,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        // Base styles
        'inline-flex items-center justify-center font-medium border',
        'transition-colors duration-200',
        // Rounded style
        rounded ? 'rounded-full' : 'rounded-md',
        // Variant styles
        badgeVariants[variant],
        // Size styles
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
