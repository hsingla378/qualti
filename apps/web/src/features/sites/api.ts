import { apiRequest } from '@/lib/api-client';

export type Site = {
  id: string;
  organizationId: string;
  name: string;
  code: string | null;
  location: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SiteFormInput = {
  name: string;
  code?: string;
  location?: string;
};

export function listSites(organizationId: string) {
  return apiRequest<Site[]>('/sites', {
    organizationId,
  });
}

export function createSite(organizationId: string, input: SiteFormInput) {
  return apiRequest<Site>('/sites', {
    method: 'POST',
    organizationId,
    body: JSON.stringify(input),
  });
}

export function updateSite(organizationId: string, siteId: string, input: SiteFormInput) {
  return apiRequest<Site>(`/sites/${siteId}`, {
    method: 'PATCH',
    organizationId,
    body: JSON.stringify(input),
  });
}

export function deleteSite(organizationId: string, siteId: string) {
  return apiRequest<{ deleted: true; id: string }>(`/sites/${siteId}`, {
    method: 'DELETE',
    organizationId,
  });
}
