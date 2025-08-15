"use client"

import { useState } from "react"
import { MessageSquare, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface CommentPinProps {
  id: string
  x: number
  y: number
  author: string
  content: string
  timestamp: string
  avatar?: string
}

export function CommentPin({ id, x, y, author, content, timestamp, avatar }: CommentPinProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="absolute w-6 h-6 bg-secondary rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center z-10"
        style={{ left: `${x}%`, top: `${y}%` }}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="w-3 h-3 text-white" />
      </div>

      {isOpen && (
        <div className="absolute z-50" style={{ left: `${x}%`, top: `${y + 5}%` }}>
          <Card className="w-64 shadow-lg border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm">{author}</CardTitle>
                    <p className="text-xs text-muted-foreground">{timestamp}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsOpen(false)}>
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm">{content}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
