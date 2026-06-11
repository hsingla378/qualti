import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  TrendingUp,
} from "lucide-react"

import {
  currentUser,
  dashboardStats,
  inspections,
  recentActivity,
} from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"

const statusVariant: Record<
  string,
  "default" | "secondary" | "success" | "warning" | "destructive" | "info"
> = {
  scheduled: "secondary",
  in_progress: "info",
  submitted: "warning",
  approved: "success",
  rejected: "destructive",
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  positive,
}: {
  title: string
  value: string | number
  change: string
  icon: React.ElementType
  positive?: boolean
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <TrendingUp
            className={`size-3 ${positive === false ? "rotate-180 text-destructive" : "text-emerald-600"}`}
          />
          <span>{change} from last month</span>
        </p>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const upcomingInspections = inspections.filter(
    (i) => i.status === "scheduled" || i.status === "in_progress"
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Good morning, ${currentUser.name.split(" ")[0]}`}
        description="Here's what's happening across your inspection operations today."
      >
        <Button asChild>
          <Link href="/app/inspections">
            New inspection
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total inspections"
          value={dashboardStats.totalInspections}
          change={dashboardStats.inspectionsChange}
          icon={ClipboardCheck}
          positive
        />
        <StatCard
          title="Completion rate"
          value={`${dashboardStats.completionRate}%`}
          change={dashboardStats.completionChange}
          icon={CheckCircle2}
          positive
        />
        <StatCard
          title="Open issues"
          value={dashboardStats.openIssues}
          change={dashboardStats.issuesChange}
          icon={AlertTriangle}
          positive
        />
        <StatCard
          title="Overdue actions"
          value={dashboardStats.overdueActions}
          change={dashboardStats.actionsChange}
          icon={Clock}
          positive
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming inspections</CardTitle>
              <CardDescription>Scheduled and in-progress inspections</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/app/inspections">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingInspections.map((inspection) => (
                <div
                  key={inspection.id}
                  className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="truncate font-medium">{inspection.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {inspection.siteName} · {inspection.assignee}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Badge variant={statusVariant[inspection.status]}>
                      {inspection.status.replace("_", " ")}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Due {inspection.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Latest actions across your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium">{activity.entity}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
