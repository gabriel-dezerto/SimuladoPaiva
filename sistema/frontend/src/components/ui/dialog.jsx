import * as React from "react"
import { cn } from "@/lib/utils"

const DialogContext = React.createContext()

function Dialog({ open, onOpenChange, children }) {
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
    <DialogContext.Provider value={{ isOpen, setIsOpen: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

function DialogTrigger({ asChild, children, onClick, ...props }) {
  const context = React.useContext(DialogContext)
  
  if (!context) {
    throw new Error("DialogTrigger deve estar dentro de um Dialog")
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

function DialogContent({ children, className, ...props }) {
  const context = React.useContext(DialogContext)
  
  if (!context) {
    throw new Error("DialogContent deve estar dentro de um Dialog")
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

function DialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
}

function DialogTitle({ className, ...props }) {
  return <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
}

function DialogDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
}
