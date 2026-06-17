'use client';

import { Building2, ChevronsUpDown } from 'lucide-react';

import { useAuth } from '@/features/auth/hooks';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function OrgSwitcher({ collapsed }: { collapsed?: boolean }) {
  const { organization, role } = useAuth();

  const organizationName = organization?.name ?? 'Organization';
  const roleLabel = role ? role.toLowerCase() : 'member';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-between gap-2 border-sidebar-border bg-sidebar px-2.5 hover:bg-sidebar-accent',
            collapsed && 'size-9 justify-center px-0',
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
              {organizationName.charAt(0)}
            </div>

            {!collapsed && (
              <div className="min-w-0 text-left">
                <p className="truncate text-sm font-medium">{organizationName}</p>
                <p className="truncate text-xs text-muted-foreground capitalize">{roleLabel}</p>
              </div>
            )}
          </div>

          {!collapsed && <ChevronsUpDown className="size-4 shrink-0 opacity-50" />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Current organization</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2">
          <Building2 className="size-4" />
          <div className="min-w-0">
            <p className="truncate text-sm">{organizationName}</p>
            <p className="truncate text-xs text-muted-foreground capitalize">{roleLabel}</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
