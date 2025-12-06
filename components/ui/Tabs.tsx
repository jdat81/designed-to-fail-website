'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useId,
  type ReactNode,
  type KeyboardEvent,
} from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

// Context for tabs state
interface TabsContextValue {
  activeTab: string
  setActiveTab: (id: string) => void
  orientation: 'horizontal' | 'vertical'
  tabIds: string[]
  registerTab: (id: string) => void
  unregisterTab: (id: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs')
  }
  return context
}

export interface TabsProps {
  /** Default active tab ID */
  defaultValue: string
  /** Controlled active tab ID */
  value?: string
  /** Callback when active tab changes */
  onValueChange?: (value: string) => void
  /** Orientation of the tabs */
  orientation?: 'horizontal' | 'vertical'
  /** Additional class names */
  className?: string
  /** Tabs content */
  children: ReactNode
}

/**
 * Tabs root component that manages active tab state.
 */
export function Tabs({
  defaultValue,
  value,
  onValueChange,
  orientation = 'horizontal',
  className,
  children,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [tabIds, setTabIds] = useState<string[]>([])

  const activeTab = value ?? internalValue

  const setActiveTab = useCallback(
    (id: string) => {
      if (!value) {
        setInternalValue(id)
      }
      onValueChange?.(id)
    },
    [value, onValueChange]
  )

  const registerTab = useCallback((id: string) => {
    setTabIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const unregisterTab = useCallback((id: string) => {
    setTabIds((prev) => prev.filter((tabId) => tabId !== id))
  }, [])

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        orientation,
        tabIds,
        registerTab,
        unregisterTab,
      }}
    >
      <div
        className={cn(
          orientation === 'vertical' && 'flex gap-4',
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export interface TabsListProps {
  /** Additional class names */
  className?: string
  /** Tab triggers */
  children: ReactNode
}

/**
 * Container for tab triggers with keyboard navigation.
 */
export function TabsList({ className, children }: TabsListProps) {
  const { orientation, tabIds, activeTab, setActiveTab } = useTabsContext()
  const tabListRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabIds.indexOf(activeTab)
    let newIndex = currentIndex

    if (orientation === 'horizontal') {
      if (e.key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % tabIds.length
      } else if (e.key === 'ArrowLeft') {
        newIndex = (currentIndex - 1 + tabIds.length) % tabIds.length
      }
    } else {
      if (e.key === 'ArrowDown') {
        newIndex = (currentIndex + 1) % tabIds.length
      } else if (e.key === 'ArrowUp') {
        newIndex = (currentIndex - 1 + tabIds.length) % tabIds.length
      }
    }

    if (e.key === 'Home') {
      newIndex = 0
    } else if (e.key === 'End') {
      newIndex = tabIds.length - 1
    }

    if (newIndex !== currentIndex) {
      e.preventDefault()
      setActiveTab(tabIds[newIndex])
      // Focus the new tab
      const tabList = tabListRef.current
      if (tabList) {
        const tabs = tabList.querySelectorAll('[role="tab"]')
        ;(tabs[newIndex] as HTMLElement)?.focus()
      }
    }
  }

  return (
    <div
      ref={tabListRef}
      role="tablist"
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative',
        orientation === 'horizontal'
          ? 'inline-flex items-center gap-1 border-b border-neutral-200'
          : 'flex flex-col gap-1 border-r border-neutral-200 pr-4',
        className
      )}
    >
      {children}
    </div>
  )
}

export interface TabsTriggerProps {
  /** Value/ID of this tab */
  value: string
  /** Whether this tab is disabled */
  disabled?: boolean
  /** Additional class names */
  className?: string
  /** Tab trigger content */
  children: ReactNode
}

/**
 * Individual tab trigger with animated indicator.
 */
export function TabsTrigger({
  value,
  disabled = false,
  className,
  children,
}: TabsTriggerProps) {
  const { activeTab, setActiveTab, orientation, registerTab, unregisterTab } =
    useTabsContext()
  const isActive = activeTab === value
  const uniqueId = useId()
  const tabId = `tab-${uniqueId}-${value}`
  const panelId = `panel-${uniqueId}-${value}`

  // Register/unregister tab
  useEffect(() => {
    registerTab(value)
    return () => unregisterTab(value)
  }, [value, registerTab, unregisterTab])

  return (
    <button
      id={tabId}
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={panelId}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(value)}
      className={cn(
        'relative px-4 py-2.5 font-medium text-sm',
        'transition-colors duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500/50',
        isActive
          ? 'text-primary-500'
          : 'text-neutral-600 hover:text-neutral-900',
        disabled && 'opacity-50 cursor-not-allowed',
        orientation === 'horizontal' ? '-mb-px' : '-mr-px',
        className
      )}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="tab-indicator"
          className={cn(
            'absolute bg-primary-500',
            orientation === 'horizontal'
              ? 'left-0 right-0 bottom-0 h-0.5'
              : 'top-0 bottom-0 right-0 w-0.5'
          )}
          initial={false}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </button>
  )
}

export interface TabsContentProps {
  /** Value/ID matching the tab trigger */
  value: string
  /** Force mount even when inactive */
  forceMount?: boolean
  /** Additional class names */
  className?: string
  /** Tab panel content */
  children: ReactNode
}

/**
 * Tab panel content component.
 */
export function TabsContent({
  value,
  forceMount = false,
  className,
  children,
}: TabsContentProps) {
  const { activeTab } = useTabsContext()
  const isActive = activeTab === value
  const uniqueId = useId()
  const tabId = `tab-${uniqueId}-${value}`
  const panelId = `panel-${uniqueId}-${value}`

  if (!isActive && !forceMount) {
    return null
  }

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={0}
      hidden={!isActive}
      className={cn(
        'mt-4 focus:outline-none',
        'motion-safe:animate-fade-in',
        !isActive && forceMount && 'hidden',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Tabs
