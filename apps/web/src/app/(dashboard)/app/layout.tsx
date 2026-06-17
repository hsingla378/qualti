import { DashboardShell } from '@/components/layout/dashboard-shell';
import { AuthProvider } from '@/features/auth/auth-provider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider requireAuth>
      <DashboardShell>{children}</DashboardShell>
    </AuthProvider>
  );
}
