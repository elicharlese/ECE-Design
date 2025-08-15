"use client"

import { MousePointer2 } from "lucide-react"

interface CollaborationCursorProps {
  name: string
  color: string
  x: number
  y: number
}

export function CollaborationCursor({ name, color, x, y }: CollaborationCursorProps) {
  return (
    <div className="absolute pointer-events-none z-50 transition-all duration-100" style={{ left: x, top: y }}>
      <div className="flex items-center gap-2">
        <MousePointer2 className="w-4 h-4" style={{ color }} />
        <div className="text-white text-xs px-2 py-1 rounded-md shadow-lg" style={{ backgroundColor: color }}>
          {name}
        </div>
      </div>
    </div>
  )
}
