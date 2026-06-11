import { ClipboardCheck, Filter, Plus } from "lucide-react"

import { inspections } from "@/lib/mock-data"
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

export default function InspectionsPage() {
  const statusCounts = inspections.reduce(
    (acc, i) => {
      acc[i.status] = (acc[i.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inspections"
        description="Track, assign, and review inspections across all sites."
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="size-4" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="size-4" />
            New inspection
          </Button>
        </div>
      </PageHeader>

      <div className="flex flex-wrap gap-2">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Badge key={status} variant="outline" className="capitalize">
            {status.replace("_", " ")}: {count}
          </Badge>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All inspections</CardTitle>
          <CardDescription>{inspections.length} total inspections</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                    Inspection
                  </th>
                  <th className="hidden px-6 py-3 text-left font-medium text-muted-foreground md:table-cell">
                    Site
                  </th>
                  <th className="hidden px-6 py-3 text-left font-medium text-muted-foreground lg:table-cell">
                    Assignee
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="hidden px-6 py-3 text-left font-medium text-muted-foreground sm:table-cell">
                    Due
                  </th>
                  <th className="hidden px-6 py-3 text-right font-medium text-muted-foreground md:table-cell">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {inspections.map((inspection) => (
                  <tr
                    key={inspection.id}
                    className="border-b transition-colors last:border-0 hover:bg-muted/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                          <ClipboardCheck className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{inspection.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {inspection.templateName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 text-muted-foreground md:table-cell">
                      {inspection.siteName}
                    </td>
                    <td className="hidden px-6 py-4 lg:table-cell">
                      {inspection.assignee}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={statusVariant[inspection.status]}>
                        {inspection.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="hidden px-6 py-4 text-muted-foreground sm:table-cell">
                      {inspection.dueDate}
                    </td>
                    <td className="hidden px-6 py-4 text-right md:table-cell">
                      {inspection.score !== undefined ? (
                        <span
                          className={
                            inspection.score >= 80
                              ? "font-medium text-emerald-600"
                              : inspection.score >= 60
                                ? "font-medium text-amber-600"
                                : "font-medium text-red-600"
                          }
                        >
                          {inspection.score}%
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
