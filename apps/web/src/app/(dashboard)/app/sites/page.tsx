import { MapPin, Plus } from "lucide-react"

import { sites } from "@/lib/mock-data"
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

export default function SitesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sites"
        description="Manage inspection locations across your organization."
      >
        <Button>
          <Plus className="size-4" />
          Add site
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sites.map((site) => (
          <Card key={site.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <MapPin className="size-5 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{site.name}</CardTitle>
                    <CardDescription>{site.location}</CardDescription>
                  </div>
                </div>
                <Badge variant={site.status === "active" ? "success" : "secondary"}>
                  {site.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 border-t pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-sm font-medium">{site.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Inspections</p>
                  <p className="text-sm font-medium">{site.inspectionsCount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Open issues</p>
                  <p className="text-sm font-medium">{site.openIssues}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
