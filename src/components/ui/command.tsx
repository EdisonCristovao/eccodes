"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { cn } from "cn"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SearchIcon } from "lucide-react"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex size-full flex-col overflow-hidden bg-card text-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * Título e descrição sem default em inglês (vêm do dicionário) e DENTRO do
 * conteúdo, para o `aria-labelledby` do diálogo apontar para dentro dele.
 */
function CommandDialog({
  title,
  description,
  children,
  className,
  showCloseButton = false,
  onCloseAutoFocus,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title: string
  description: string
  className?: string
  showCloseButton?: boolean
  onCloseAutoFocus?: React.ComponentProps<
    typeof DialogContent
  >["onCloseAutoFocus"]
}) {
  return (
    <Dialog {...props}>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

/** Linha do input (h-11, borda inferior); `end` fica à direita (ex.: Cancel). */
function CommandInput({
  className,
  end,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  end?: React.ReactNode
}) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-11 shrink-0 items-center gap-2 border-b border-border pl-3"
    >
      <SearchIcon
        className="size-4 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent text-base text-foreground outline-hidden [font-variant-ligatures:none] placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:text-editor",
          className
        )}
        {...props}
      />
      {end}
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[min(400px,60dvh)] scroll-py-1 overflow-x-hidden overflow-y-auto overscroll-contain py-1 outline-none",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(
        "px-3 py-6 text-center text-editor text-syntax-comment",
        className
      )}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden text-foreground **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:pt-2 **:[[cmdk-group-heading]]:pb-1 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:tracking-wider **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:uppercase",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("h-px bg-border", className)}
      {...props}
    />
  )
}

/**
 * Os spans internos herdam o tamanho do item (a base do globals.css põe
 * `span { 18px }`); o CommandShortcut mantém o text-xs.
 *
 * Item: muted no repouso; o ativo (`data-selected`) fica `bg-accent` +
 * `text-foreground` com a borda laranja à esquerda (sombra inset, sem mudar
 * a largura), como o item ativo do explorer. Muted sobre accent é proibido
 * (guia §2.4): o que for secundário usa `group-data-selected/command-item:`.
 */
function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item relative flex h-11 cursor-default items-center gap-2 px-3 text-editor text-muted-foreground outline-hidden select-none sm:h-9 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-accent data-selected:text-foreground data-selected:shadow-[inset_2px_0_0_var(--color-ring)] [&_span:not([data-slot=command-shortcut])]:text-[length:inherit] [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto shrink-0 text-xs text-muted-foreground group-data-selected/command-item:text-foreground/80",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
