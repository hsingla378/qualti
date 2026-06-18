'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createSite, deleteSite, listSites, type SiteFormInput, updateSite } from './api';

export function sitesQueryKey(organizationId: string) {
  return ['sites', organizationId] as const;
}

export function useSites(organizationId: string | undefined) {
  return useQuery({
    queryKey: organizationId ? sitesQueryKey(organizationId) : ['sites', 'none'],
    queryFn: () => listSites(organizationId!),
    enabled: Boolean(organizationId),
  });
}

export function useCreateSite(organizationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SiteFormInput) => createSite(organizationId, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: sitesQueryKey(organizationId),
      });
    },
  });
}

export function useUpdateSite(organizationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ siteId, input }: { siteId: string; input: SiteFormInput }) =>
      updateSite(organizationId, siteId, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: sitesQueryKey(organizationId),
      });
    },
  });
}

export function useDeleteSite(organizationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (siteId: string) => deleteSite(organizationId, siteId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: sitesQueryKey(organizationId),
      });
    },
  });
}
