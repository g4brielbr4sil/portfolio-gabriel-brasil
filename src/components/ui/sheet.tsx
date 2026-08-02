import * as SheetPrimitive from '@radix-ui/react-dialog'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export const Sheet = SheetPrimitive.Root
export const SheetTrigger = SheetPrimitive.Trigger
export const SheetClose = SheetPrimitive.Close
export const SheetTitle = SheetPrimitive.Title
export const SheetDescription = SheetPrimitive.Description

type SheetContentProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right'
}

const sides = {
  top: 'inset-x-3 top-3 rounded-2xl data-[state=closed]:animate-[sheet-out_240ms_ease] data-[state=open]:animate-[sheet-in_360ms_cubic-bezier(0.16,1,0.3,1)]',
  right:
    'inset-y-0 right-0 w-[88%] max-w-sm rounded-l-3xl border-y-0 border-r-0 data-[state=closed]:animate-[sheet-out-right_240ms_ease] data-[state=open]:animate-[sheet-in-right_380ms_cubic-bezier(0.16,1,0.3,1)]',
} as const

export function SheetContent({
  className,
  children,
  side = 'top',
  ...props
}: SheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm data-[state=closed]:animate-[fade-out_240ms_ease] data-[state=open]:animate-[fade-in_320ms_ease]" />
      <SheetPrimitive.Content
        className={cn(
          'fixed z-50 border border-line bg-ink p-6 shadow-[0_24px_80px_rgba(0,0,0,0.6)]',
          sides[side],
          className,
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}
