"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MousePointer2, Square, Circle, Triangle, Type, ImageIcon, Pen, Eraser, Hand, Zap } from "lucide-react"

interface DesignToolbarProps {
  selectedTool: string
  onToolSelect: (tool: string) => void
}

const tools = [
  { id: "select", icon: MousePointer2, label: "Select" },
  { id: "rectangle", icon: Square, label: "Rectangle" },
  { id: "circle", icon: Circle, label: "Circle" },
  { id: "triangle", icon: Triangle, label: "Triangle" },
  { id: "text", icon: Type, label: "Text" },
  { id: "image", icon: ImageIcon, label: "Image" },
  { id: "pen", icon: Pen, label: "Pen" },
  { id: "eraser", icon: Eraser, label: "Eraser" },
  { id: "hand", icon: Hand, label: "Hand" },
  { id: "ai", icon: Zap, label: "AI Generate" },
]

export function DesignToolbar({ selectedTool, onToolSelect }: DesignToolbarProps) {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedTool === tool.id ? "default" : "ghost"}
                  size="sm"
                  className={`w-11 h-11 p-0 transition-all duration-200 ${
                    selectedTool === tool.id
                      ? "bg-primary text-primary-foreground apple-shadow"
                      : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => onToolSelect(tool.id)}
                >
                  <Icon className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="apple-shadow">
                <p className="font-medium">{tool.label}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
