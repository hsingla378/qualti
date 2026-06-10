import { Button } from '@qualti/ui';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-6 px-6">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Qualti.io</p>
      <h1 className="text-4xl font-semibold tracking-tight">Enterprise inspection management</h1>
      <p className="text-lg text-slate-600">
        Run structured inspections, track compliance, and keep teams aligned.
      </p>
      <Button>Get started</Button>
    </main>
  );
}
