'use client';

import { useQuery } from '@tanstack/react-query';

import { listAuditEvents } from './api';

export function auditEventsQueryKey(organizationId: string) {
  return ['audit-events', organizationId] as const;
}

export function useAuditEvents(organizationId: string | undefined) {
  return useQuery({
    queryKey: organizationId ? auditEventsQueryKey(organizationId) : ['audit-events', 'none'],
    queryFn: () => listAuditEvents(organizationId!),
    enabled: Boolean(organizationId),
  });
}
