'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

const DialogContext = React.createContext(null)

export function Dialog({ open, onOpenChange, children }) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  
  const isOpen = open !== undefined ? open : internalOpen

  return (
    <DialogContext.Provider value={{ isOpen, onOpenChange, setInternalOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

export function DialogTrigger({ asChild, children, ...props }) {
  const context = React.useContext(DialogContext)
  if (!context) return null

  const { onOpenChange, setInternalOpen } = context

  const handleClick = () => {
    if (onOpenChange) {
      onOpenChange(true)
    } else {
      setInternalOpen(true)
    }
  }

  if (asChild) {
    return React.cloneElement(children, {
      onClick: handleClick,
      ...props,
    })
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

export function DialogContent({ children, className, ...props }) {
  const context = React.useContext(DialogContext)
  if (!context) return null

  const { isOpen, onOpenChange, setInternalOpen } = context

  if (!isOpen) return null

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false)
    } else {
      setInternalOpen(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={handleClose}
      />
      <div
        className={cn(
          "relative z-50 w-full max-w-lg border bg-white p-6 shadow-lg rounded-lg",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
}

export function DialogTitle({ className, ...props }) {
  return <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
}

export function DialogDescription({ className, ...props }) {
  return <p className={cn("text-sm text-gray-600", className)} {...props} />
}
