import { apiRequest } from '@/lib/api-client';

export type AuditActor = {
  id: string;
  name: string | null;
  email: string;
};

export type AuditEvent = {
  id: string;
  organizationId: string;
  actorId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: unknown;
  createdAt: string;
  actor: AuditActor | null;
};

export function listAuditEvents(organizationId: string) {
  return apiRequest<AuditEvent[]>('/audit-events', {
    organizationId,
  });
}
