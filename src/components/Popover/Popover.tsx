import { arrow, FloatingPortal, useFloating, offset, shift, autoUpdate, type Placement } from '@floating-ui/react'
import { AnimatePresence } from 'framer-motion'
import React, { ElementType, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  as?: ElementType
  className?: string
  initialOpen?: boolean
  placement?: Placement
}
export default function Popover({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement = "bottom-end"
}: Props) {
  const id = useId()
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const { refs, middlewareData, x, y, strategy } = useFloating({
    onOpenChange: setIsOpen,
    open: isOpen,
    middleware: [
      arrow({
        element: arrowRef
      }),
      offset(10),
      shift()
    ],
    whileElementsMounted: autoUpdate,
    placement: placement
  })
  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  return (
    <Element
      className={`${className} `}
      ref={refs.setReference}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
      id={id}
    >
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <span
                ref={arrowRef}
                className='border-x-transparent border-t-transparent border-b-white -translate-y-full  border-[8px]'
                style={{
                  position: 'absolute',
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              ></span>
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
