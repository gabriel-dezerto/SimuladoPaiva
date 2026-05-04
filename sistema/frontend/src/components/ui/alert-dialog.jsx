import * as React from "react"
import { cn } from "@/lib/utils"

const AlertDialogContext = React.createContext()

function AlertDialog({ open, onOpenChange, children }) {
  const [internalOpen, setInternalOpen] = React.useState(open ?? false)
  
  // Se open for controlado externamente, use-o
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const handleOpenChange = (newOpen) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <AlertDialogContext.Provider value={{ isOpen, setIsOpen: handleOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

function AlertDialogTrigger({ asChild, children, onClick, ...props }) {
  const context = React.useContext(AlertDialogContext)
  
  if (!context) {
    throw new Error("AlertDialogTrigger deve estar dentro de um AlertDialog")
  }

  const { setIsOpen } = context

  const handleClick = (e) => {
    setIsOpen(true)
    onClick?.(e)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { 
      onClick: (e) => {
        children.props.onClick?.(e)
        handleClick(e)
      },
      ...props 
    })
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

function AlertDialogContent({ children, className, ...props }) {
  const context = React.useContext(AlertDialogContext)
  
  if (!context) {
    throw new Error("AlertDialogContent deve estar dentro de um AlertDialog")
  }

  const { isOpen, setIsOpen } = context

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => setIsOpen(false)}
      />
      <div
        className={cn(
          "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-background p-6 shadow-lg rounded-lg",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

function AlertDialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
}

function AlertDialogTitle({ className, ...props }) {
  return <h2 className={cn("text-lg font-semibold", className)} {...props} />
}

function AlertDialogDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function AlertDialogAction({ onClick, className, ...props }) {
  const context = React.useContext(AlertDialogContext)
  
  if (!context) {
    throw new Error("AlertDialogAction deve estar dentro de um AlertDialog")
  }

  const { setIsOpen } = context

  const handleClick = (e) => {
    onClick?.(e)
    setIsOpen(false)
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogCancel({ onClick, className, ...props }) {
  const context = React.useContext(AlertDialogContext)
  
  if (!context) {
    throw new Error("AlertDialogCancel deve estar dentro de um AlertDialog")
  }

  const { setIsOpen } = context

  const handleClick = (e) => {
    onClick?.(e)
    setIsOpen(false)
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
