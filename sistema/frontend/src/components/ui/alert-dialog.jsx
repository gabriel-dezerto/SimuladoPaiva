'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

const AlertDialogContext = React.createContext(null)

export function AlertDialog({ open, onOpenChange, children }) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  
  const isOpen = open !== undefined ? open : internalOpen

  return (
    <AlertDialogContext.Provider value={{ isOpen, onOpenChange, setInternalOpen }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

export function AlertDialogTrigger({ asChild, children, ...props }) {
  const context = React.useContext(AlertDialogContext)
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

export function AlertDialogContent({ children, className, ...props }) {
  const context = React.useContext(AlertDialogContext)
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

export function AlertDialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
}

export function AlertDialogTitle({ className, ...props }) {
  return <h2 className={cn("text-lg font-semibold", className)} {...props} />
}

export function AlertDialogDescription({ className, ...props }) {
  return <p className={cn("text-sm text-gray-600", className)} {...props} />
}

export function AlertDialogAction({ onClick, className, ...props }) {
  const context = React.useContext(AlertDialogContext)
  if (!context) return null

  const { onOpenChange, setInternalOpen } = context

  const handleClick = (e) => {
    onClick?.(e)
    if (onOpenChange) {
      onOpenChange(false)
    } else {
      setInternalOpen(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700",
        className
      )}
      {...props}
    />
  )
}

export function AlertDialogCancel({ onClick, className, ...props }) {
  const context = React.useContext(AlertDialogContext)
  if (!context) return null

  const { onOpenChange, setInternalOpen } = context

  const handleClick = (e) => {
    onClick?.(e)
    if (onOpenChange) {
      onOpenChange(false)
    } else {
      setInternalOpen(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50",
        className
      )}
      {...props}
    />
  )
}
