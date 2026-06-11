"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

import { organizations, currentOrg } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function OrgSwitcher({ collapsed }: { collapsed?: boolean }) {
  const [selected, setSelected] = useState(currentOrg)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between gap-2 border-sidebar-border bg-sidebar px-2.5 hover:bg-sidebar-accent",
            collapsed && "size-9 justify-center px-0"
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
              {selected.name.charAt(0)}
            </div>
            {!collapsed && (
              <div className="min-w-0 text-left">
                <p className="truncate text-sm font-medium">{selected.name}</p>
                <p className="truncate text-xs text-muted-foreground capitalize">
                  {selected.plan} plan
                </p>
              </div>
            )}
          </div>
          {!collapsed && <ChevronsUpDown className="size-4 shrink-0 opacity-50" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => setSelected(org)}
            className="gap-2"
          >
            <div className="flex size-6 items-center justify-center rounded-md bg-muted text-[10px] font-bold">
              {org.name.charAt(0)}
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm">{org.name}</p>
              <p className="truncate text-xs text-muted-foreground capitalize">
                {org.plan}
              </p>
            </div>
            {selected.id === org.id && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Plus className="size-4" />
          Create organization
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
