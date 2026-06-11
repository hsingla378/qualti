import { FileStack, Plus } from "lucide-react"

import { templates } from "@/lib/mock-data"
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
  "default" | "secondary" | "success" | "warning" | "destructive"
> = {
  draft: "secondary",
  published: "success",
  archived: "warning",
}

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Templates"
        description="Create and manage versioned inspection templates."
      >
        <Button>
          <Plus className="size-4" />
          New template
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>All templates</CardTitle>
          <CardDescription>
            {templates.length} templates · {templates.filter((t) => t.status === "published").length} published
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                    Template
                  </th>
                  <th className="hidden px-6 py-3 text-left font-medium text-muted-foreground md:table-cell">
                    Category
                  </th>
                  <th className="hidden px-6 py-3 text-left font-medium text-muted-foreground sm:table-cell">
                    Version
                  </th>
                  <th className="hidden px-6 py-3 text-left font-medium text-muted-foreground lg:table-cell">
                    Fields
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="hidden px-6 py-3 text-right font-medium text-muted-foreground md:table-cell">
                    Usage
                  </th>
                </tr>
              </thead>
              <tbody>
                {templates.map((template) => (
                  <tr
                    key={template.id}
                    className="border-b transition-colors last:border-0 hover:bg-muted/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                          <FileStack className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-xs text-muted-foreground md:hidden">
                            {template.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 text-muted-foreground md:table-cell">
                      {template.category}
                    </td>
                    <td className="hidden px-6 py-4 sm:table-cell">
                      v{template.version}
                    </td>
                    <td className="hidden px-6 py-4 lg:table-cell">
                      {template.fieldsCount}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={statusVariant[template.status]}>
                        {template.status}
                      </Badge>
                    </td>
                    <td className="hidden px-6 py-4 text-right text-muted-foreground md:table-cell">
                      {template.usageCount}
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
