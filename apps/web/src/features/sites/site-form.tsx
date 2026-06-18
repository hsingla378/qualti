'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { siteFormSchema, type SiteFormValues, toSiteFormInput } from './schema';

type SiteFormProps = {
  initialValues?: Partial<SiteFormValues>;
  isSubmitting?: boolean;
  submitLabel: string;
  onSubmit: (values: ReturnType<typeof toSiteFormInput>) => void;
};

const emptyValues: SiteFormValues = {
  name: '',
  code: '',
  location: '',
};

export function SiteForm({
  initialValues,
  isSubmitting = false,
  submitLabel,
  onSubmit,
}: SiteFormProps) {
  const form = useForm<SiteFormValues>({
    resolver: zodResolver(siteFormSchema),
    defaultValues: {
      ...emptyValues,
      ...initialValues,
    },
  });

  useEffect(() => {
    form.reset({
      ...emptyValues,
      ...initialValues,
    });
  }, [form, initialValues]);

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit((values) => onSubmit(toSiteFormInput(values)))}
    >
      <div className="space-y-2">
        <Label htmlFor="site-name">Site name</Label>
        <Input
          id="site-name"
          placeholder="Main Factory"
          disabled={isSubmitting}
          {...form.register('name')}
        />
        {form.formState.errors.name ? (
          <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="site-code">Code</Label>
        <Input
          id="site-code"
          placeholder="MFG-001"
          disabled={isSubmitting}
          {...form.register('code')}
        />
        {form.formState.errors.code ? (
          <p className="text-sm text-destructive">{form.formState.errors.code.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="site-location">Location</Label>
        <Input
          id="site-location"
          placeholder="Gurugram, Haryana"
          disabled={isSubmitting}
          {...form.register('location')}
        />
        {form.formState.errors.location ? (
          <p className="text-sm text-destructive">{form.formState.errors.location.message}</p>
        ) : null}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Saving...' : submitLabel}
      </Button>
    </form>
  );
}
