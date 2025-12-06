'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useId,
  type ReactNode,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

// Context for accordion state
interface AccordionContextValue {
  expandedItems: Set<string>
  toggleItem: (id: string) => void
  allowMultiple: boolean
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion')
  }
  return context
}

// Context for individual accordion item
interface AccordionItemContextValue {
  itemId: string
  isExpanded: boolean
  toggle: () => void
  headerId: string
  panelId: string
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null
)

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext)
  if (!context) {
    throw new Error(
      'AccordionItem components must be used within an AccordionItem'
    )
  }
  return context
}

// Animation variants
const contentVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
}

// Reduced motion variants
const reducedMotionVariants = {
  collapsed: { opacity: 0, height: 0 },
  expanded: { opacity: 1, height: 'auto' },
}

export interface AccordionProps {
  /** Allow multiple items to be expanded simultaneously */
  allowMultiple?: boolean
  /** Initially expanded item IDs */
  defaultExpanded?: string[]
  /** Additional class names */
  className?: string
  /** Accordion items */
  children: ReactNode
}

/**
 * Accordion root component that manages expansion state.
 */
export function Accordion({
  allowMultiple = false,
  defaultExpanded = [],
  className,
  children,
}: AccordionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(defaultExpanded)
  )

  const toggleItem = useCallback(
    (id: string) => {
      setExpandedItems((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          if (!allowMultiple) {
            next.clear()
          }
          next.add(id)
        }
        return next
      })
    },
    [allowMultiple]
  )

  return (
    <AccordionContext.Provider
      value={{ expandedItems, toggleItem, allowMultiple }}
    >
      <div className={cn('divide-y divide-neutral-200', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export interface AccordionItemProps {
  /** Unique identifier for this item */
  id?: string
  /** Additional class names */
  className?: string
  /** Accordion item content (trigger and panel) */
  children: ReactNode
}

/**
 * Individual accordion item container.
 */
export function AccordionItem({ id, className, children }: AccordionItemProps) {
  const generatedId = useId()
  const itemId = id || generatedId
  const { expandedItems, toggleItem } = useAccordionContext()

  const isExpanded = expandedItems.has(itemId)
  const toggle = useCallback(() => toggleItem(itemId), [toggleItem, itemId])

  const headerId = `accordion-header-${itemId}`
  const panelId = `accordion-panel-${itemId}`

  return (
    <AccordionItemContext.Provider
      value={{ itemId, isExpanded, toggle, headerId, panelId }}
    >
      <div className={cn('', className)}>{children}</div>
    </AccordionItemContext.Provider>
  )
}

export interface AccordionTriggerProps {
  /** Additional class names */
  className?: string
  /** Trigger content */
  children: ReactNode
}

/**
 * Accordion trigger button that toggles expansion.
 */
export function AccordionTrigger({
  className,
  children,
}: AccordionTriggerProps) {
  const { isExpanded, toggle, headerId, panelId } = useAccordionItemContext()

  return (
    <h3>
      <button
        id={headerId}
        type="button"
        onClick={toggle}
        className={cn(
          'flex w-full items-center justify-between py-4',
          'text-left font-semibold text-neutral-900',
          'transition-colors duration-200',
          'hover:text-primary-500',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500/50',
          className
        )}
        aria-expanded={isExpanded}
        aria-controls={panelId}
      >
        <span>{children}</span>
        <motion.span
          className="ml-4 flex-shrink-0 text-neutral-500"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ originX: 0.5, originY: 0.5 }}
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.span>
      </button>
    </h3>
  )
}

export interface AccordionContentProps {
  /** Additional class names */
  className?: string
  /** Panel content */
  children: ReactNode
}

/**
 * Accordion content panel with smooth animation.
 */
export function AccordionContent({
  className,
  children,
}: AccordionContentProps) {
  const { isExpanded, headerId, panelId } = useAccordionItemContext()
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          variants={
            prefersReducedMotion ? reducedMotionVariants : contentVariants
          }
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          className="overflow-hidden"
        >
          <div className={cn('pb-4 text-neutral-600', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Accordion
