"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Heart, Share2, MoreHorizontal } from "lucide-react"

interface AIGenerationCardProps {
  title: string
  description: string
  imageUrl: string
  type: "image" | "text" | "design"
  createdAt: string
  likes?: number
}

export function AIGenerationCard({ title, description, imageUrl, type, createdAt, likes = 0 }: AIGenerationCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "bg-primary/10 text-primary"
      case "text":
        return "bg-secondary/10 text-secondary"
      case "design":
        return "bg-accent/10 text-accent"
      default:
        return "bg-muted/10 text-muted-foreground"
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg overflow-hidden">
        {type === "image" ? (
          <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-4">
              <h3 className="font-medium text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
            </div>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
            <CardDescription className="line-clamp-2">{description}</CardDescription>
          </div>
          <Badge variant="secondary" className={`text-xs ${getTypeColor(type)}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{createdAt}</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
