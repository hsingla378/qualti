import z from 'zod';

import type { SiteFormInput } from './api';

export const siteFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Site name is required')
    .max(80, 'Site name must be 80 characters or less'),
  code: z.string().trim().max(24, 'Site code must be 24 characters or less').optional(),
  location: z.string().trim().max(140, 'Location must be 140 characters or less').optional(),
});

export type SiteFormValues = z.infer<typeof siteFormSchema>;

export function toSiteFormInput(values: SiteFormValues): SiteFormInput {
  return {
    name: values.name,
    code: values.code || undefined,
    location: values.location || undefined,
  };
}
