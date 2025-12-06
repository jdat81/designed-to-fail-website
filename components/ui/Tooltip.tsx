'use client'

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useId,
  type ReactNode,
  type CSSProperties,
} from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  /** Tooltip content */
  content: ReactNode
  /** Element that triggers the tooltip */
  children: ReactNode
  /** Placement of the tooltip relative to the trigger */
  placement?: TooltipPlacement
  /** Delay before showing tooltip in ms */
  delay?: number
  /** Whether the tooltip is disabled */
  disabled?: boolean
  /** Additional class names for the tooltip */
  className?: string
  /** Offset from the trigger element in pixels */
  offset?: number
}

// Animation variants
const tooltipVariants = {
  initial: (placement: TooltipPlacement) => ({
    opacity: 0,
    scale: 0.95,
    ...(placement === 'top' && { y: 4 }),
    ...(placement === 'bottom' && { y: -4 }),
    ...(placement === 'left' && { x: 4 }),
    ...(placement === 'right' && { x: -4 }),
  }),
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  exit: (placement: TooltipPlacement) => ({
    opacity: 0,
    scale: 0.95,
    ...(placement === 'top' && { y: 4 }),
    ...(placement === 'bottom' && { y: -4 }),
    ...(placement === 'left' && { x: 4 }),
    ...(placement === 'right' && { x: -4 }),
    transition: {
      duration: 0.1,
    },
  }),
}

// Reduced motion variants
const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

/**
 * Tooltip component that displays additional information on hover.
 * Accessible, animated, and supports multiple placements.
 */
export function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 200,
  disabled = false,
  className,
  offset = 8,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<CSSProperties>({})
  const [mounted, setMounted] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tooltipId = useId()

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate tooltip position
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    let top = 0
    let left = 0

    switch (placement) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - offset
        left =
          triggerRect.left +
          scrollX +
          triggerRect.width / 2 -
          tooltipRect.width / 2
        break
      case 'bottom':
        top = triggerRect.bottom + scrollY + offset
        left =
          triggerRect.left +
          scrollX +
          triggerRect.width / 2 -
          tooltipRect.width / 2
        break
      case 'left':
        top =
          triggerRect.top +
          scrollY +
          triggerRect.height / 2 -
          tooltipRect.height / 2
        left = triggerRect.left + scrollX - tooltipRect.width - offset
        break
      case 'right':
        top =
          triggerRect.top +
          scrollY +
          triggerRect.height / 2 -
          tooltipRect.height / 2
        left = triggerRect.right + scrollX + offset
        break
    }

    // Keep tooltip within viewport
    const padding = 8
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Adjust horizontal position
    if (left < padding) {
      left = padding
    } else if (left + tooltipRect.width > viewportWidth - padding) {
      left = viewportWidth - tooltipRect.width - padding
    }

    // Adjust vertical position
    if (top < padding + scrollY) {
      top = padding + scrollY
    } else if (top + tooltipRect.height > viewportHeight + scrollY - padding) {
      top = viewportHeight + scrollY - tooltipRect.height - padding
    }

    setPosition({ top, left })
  }, [placement, offset])

  // Update position when visible
  useEffect(() => {
    if (isVisible) {
      updatePosition()
      // Update position on scroll/resize
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
      return () => {
        window.removeEventListener('scroll', updatePosition, true)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [isVisible, updatePosition])

  const showTooltip = useCallback(() => {
    if (disabled) return
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }, [disabled, delay])

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        aria-describedby={isVisible ? tooltipId : undefined}
        className="inline-block"
      >
        {children}
      </div>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isVisible && (
              <motion.div
                ref={tooltipRef}
                id={tooltipId}
                role="tooltip"
                custom={placement}
                variants={
                  prefersReducedMotion ? reducedMotionVariants : tooltipVariants
                }
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  position: 'absolute',
                  ...position,
                }}
                className={cn(
                  'z-50 px-3 py-2 text-sm font-medium',
                  'bg-neutral-900 text-white rounded-lg shadow-medium',
                  'max-w-xs',
                  className
                )}
              >
                {content}
                {/* Arrow */}
                <div
                  className={cn(
                    'absolute w-2 h-2 bg-neutral-900 rotate-45',
                    placement === 'top' &&
                      'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
                    placement === 'bottom' &&
                      'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
                    placement === 'left' &&
                      'right-0 top-1/2 translate-x-1/2 -translate-y-1/2',
                    placement === 'right' &&
                      'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2'
                  )}
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}

export default Tooltip
