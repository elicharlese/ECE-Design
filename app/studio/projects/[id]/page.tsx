"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Share2,
  Settings,
  ArrowLeft,
  Plus,
  MoreHorizontal,
  Eye,
  Edit3,
  Clock,
  Send,
  Paperclip,
  Video,
  Phone,
  UserPlus,
  Crown,
  Palette,
  Layers,
  MousePointer2,
} from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockCollaborators = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "online",
    role: "Owner",
    cursor: { x: 45, y: 30 },
  },
  {
    id: 2,
    name: "Alex Rivera",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "online",
    role: "Editor",
    cursor: { x: 60, y: 45 },
  },
  {
    id: 3,
    name: "Jordan Kim",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "away",
    role: "Viewer",
    cursor: null,
  },
  {
    id: 4,
    name: "Taylor Swift",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "offline",
    role: "Editor",
    cursor: null,
  },
]

const mockComments = [
  {
    id: 1,
    author: "Sarah Chen",
    content: "Love the color palette! Can we make the header slightly larger?",
    timestamp: "2 min ago",
    x: 45,
    y: 30,
  },
  {
    id: 2,
    author: "Alex Rivera",
    content: "The AI generation looks amazing. Should we add more spacing here?",
    timestamp: "5 min ago",
    x: 60,
    y: 45,
  },
  {
    id: 3,
    author: "Jordan Kim",
    content: "This design direction is perfect for our brand guidelines.",
    timestamp: "1 hour ago",
    x: 30,
    y: 60,
  },
]

export default function WorkspacePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("canvas")
  const [newComment, setNewComment] = useState("")
  const [showCursors, setShowCursors] = useState(true)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Studio
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xl font-semibold">Brand Campaign Design</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                    <span>Last saved 2 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Collaborators */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {mockCollaborators.slice(0, 4).map((collaborator) => (
                    <div key={collaborator.id} className="relative">
                      <Avatar className="w-8 h-8 border-2 border-background">
                        <AvatarImage src={collaborator.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {collaborator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                          collaborator.status === "online"
                            ? "bg-green-500"
                            : collaborator.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Main Workspace */}
        <div className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b border-border bg-card/30">
              <div className="container mx-auto px-6">
                <TabsList className="bg-transparent h-12">
                  <TabsTrigger value="canvas" className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Canvas
                  </TabsTrigger>
                  <TabsTrigger value="assets" className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Assets
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    History
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="canvas" className="flex-1 m-0 p-0">
              <div className="relative h-full bg-muted/20">
                {/* Canvas Area */}
                <div className="absolute inset-4 bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Mock Design Canvas */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 relative">
                    <div className="absolute inset-8 bg-white rounded-lg shadow-sm p-8">
                      <div className="text-center space-y-6">
                        <div className="w-24 h-24 bg-primary rounded-2xl mx-auto flex items-center justify-center">
                          <Palette className="w-12 h-12 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-foreground mb-2">Brand Campaign</h2>
                          <p className="text-muted-foreground">Collaborative design workspace</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="aspect-square bg-muted rounded-lg"></div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Live Cursors */}
                    {showCursors &&
                      mockCollaborators
                        .filter((c) => c.cursor && c.status === "online")
                        .map((collaborator) => (
                          <div
                            key={collaborator.id}
                            className="absolute pointer-events-none z-10"
                            style={{ left: `${collaborator.cursor!.x}%`, top: `${collaborator.cursor!.y}%` }}
                          >
                            <div className="flex items-center gap-2">
                              <MousePointer2 className="w-4 h-4 text-primary" />
                              <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">
                                {collaborator.name}
                              </div>
                            </div>
                          </div>
                        ))}

                    {/* Comment Pins */}
                    {mockComments.map((comment) => (
                      <div
                        key={comment.id}
                        className="absolute w-6 h-6 bg-secondary rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center"
                        style={{ left: `${comment.x}%`, top: `${comment.y}%` }}
                      >
                        <MessageSquare className="w-3 h-3 text-white" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Toolbar */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <Card className="border-0 bg-card/90 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-2">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Palette className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Layers className="w-4 h-4" />
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="assets" className="flex-1 m-0 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Card
                    key={i}
                    className="aspect-square hover:shadow-md transition-all cursor-pointer border-0 bg-card/50"
                  >
                    <CardContent className="p-4 h-full flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="flex-1 m-0 p-6">
              <div className="space-y-4">
                {[
                  { action: "Sarah Chen added new elements", time: "2 minutes ago", type: "edit" },
                  { action: "Alex Rivera changed color palette", time: "5 minutes ago", type: "design" },
                  { action: "Jordan Kim left a comment", time: "10 minutes ago", type: "comment" },
                  { action: "Taylor Swift joined the workspace", time: "1 hour ago", type: "user" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-card/50">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar - Comments & Team */}
        <div className="w-80 border-l border-border bg-card/30">
          <Tabs defaultValue="comments" className="h-full flex flex-col">
            <div className="border-b border-border p-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="comments" className="flex-1 flex flex-col m-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {comment.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-foreground pl-8">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[60px] resize-none"
                  />
                  <div className="flex flex-col gap-2">
                    <Button size="sm" disabled={!newComment.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team" className="flex-1 m-0 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Team Members</h3>
                  <Button variant="outline" size="sm">
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {mockCollaborators.map((collaborator) => (
                    <div key={collaborator.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={collaborator.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {collaborator.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                            collaborator.status === "online"
                              ? "bg-green-500"
                              : collaborator.status === "away"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">{collaborator.name}</p>
                          {collaborator.role === "Owner" && <Crown className="w-3 h-3 text-yellow-500" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{collaborator.role}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
