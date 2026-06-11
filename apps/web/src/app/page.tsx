import Link from "next/link"
import { ArrowRight, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-6 px-6">
      <div className="flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Shield className="size-5" />
        </div>
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Qualti.io
        </p>
      </div>
      <h1 className="text-4xl font-semibold tracking-tight">
        Enterprise inspection management
      </h1>
      <p className="text-lg text-muted-foreground">
        Run structured inspections, track compliance, and keep teams aligned across
        every site.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/app">
            Open dashboard
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </main>
  )
}
