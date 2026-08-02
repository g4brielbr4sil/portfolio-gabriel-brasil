import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export const Collapsible = CollapsiblePrimitive.Root
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger

/** Anima altura, opacidade e deslocamento; o conteúdo permanece no DOM. */
export function CollapsibleContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>) {
  return (
    <CollapsiblePrimitive.Content
      className={cn(
        'overflow-hidden data-[state=closed]:animate-[collapsible-up_260ms_cubic-bezier(0.16,1,0.3,1)] data-[state=open]:animate-[collapsible-down_360ms_cubic-bezier(0.16,1,0.3,1)]',
        className,
      )}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Content>
  )
}
