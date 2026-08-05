import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { ComponentPropsWithoutRef } from 'react'
import { X } from '@phosphor-icons/react/dist/csr/X'
import { cn } from '@/lib/utils'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogClose = DialogPrimitive.Close
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description

type DialogContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  fullScreenMobile?: boolean
}

export function DialogContent({ className, children, fullScreenMobile = true, ...props }: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-black/78 backdrop-blur-sm data-[state=closed]:animate-[fade-out_180ms_ease] data-[state=open]:animate-[fade-in_220ms_ease] motion-reduce:animate-none motion-reduce:transition-none" />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-[80] w-[min(92vw,1400px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-line bg-[#0a0a0a] text-cream shadow-[0_28px_100px_rgba(0,0,0,0.75)] outline-none data-[state=closed]:animate-[fade-out_180ms_ease] data-[state=open]:animate-[fade-in_220ms_ease] motion-reduce:animate-none motion-reduce:transition-none',
          fullScreenMobile &&
            'max-md:inset-0 max-md:left-0 max-md:top-0 max-md:h-[100dvh] max-md:w-screen max-md:max-w-none max-md:translate-x-0 max-md:translate-y-0 max-md:rounded-none',
          'md:max-h-[90dvh] md:rounded-[1.75rem]',
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

export function DialogCloseButton({ className, ...props }: ComponentPropsWithoutRef<typeof DialogPrimitive.Close>) {
  return (
    <DialogClose
      aria-label="Fechar estudo de caso"
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/80 bg-ink/80 text-cream/80 transition-colors hover:text-cream',
        className,
      )}
      {...props}
    >
      <X size={18} weight="regular" aria-hidden="true" />
    </DialogClose>
  )
}
