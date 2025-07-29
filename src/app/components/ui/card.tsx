import * as React from "react"
import { cn } from "@/app/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow", className)} {...props} />
))
Card.displayName = "Card"

// ... (Diğer Card bileşenleri: CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
// Kısaltma amacıyla sadece ana bileşeni ekledim, projenizden genişletebilirsiniz.

export { Card };