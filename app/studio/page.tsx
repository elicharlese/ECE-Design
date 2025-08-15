"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  User,
  Settings,
  LogOut,
  Plus,
  Palette,
  Zap,
  Users,
  ImageIcon,
  TrendingUp,
  Clock,
  Star,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [user] = useState({
    name: "Alex Rivera",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    plan: "Pro",
    joinDate: "January 2024",
  })

  const recentProjects = [
    {
      id: "1",
      name: "Brand Identity System",
      type: "Design System",
      lastModified: "2 hours ago",
      collaborators: 3,
      thumbnail: "/placeholder.svg?height=120&width=160",
    },
    {
      id: "2",
      name: "Mobile App Wireframes",
      type: "UI Design",
      lastModified: "1 day ago",
      collaborators: 2,
      thumbnail: "/placeholder.svg?height=120&width=160",
    },
    {
      id: "3",
      name: "Marketing Campaign",
      type: "Graphics",
      lastModified: "3 days ago",
      collaborators: 5,
      thumbnail: "/placeholder.svg?height=120&width=160",
    },
  ]

  const recentActivity = [
    {
      id: "1",
      type: "project_created",
      message: "Created new project 'Brand Identity System'",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "collaboration",
      message: "Sarah Chen joined 'Mobile App Wireframes'",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      type: "ai_generation",
      message: "Generated 3 AI images for 'Marketing Campaign'",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      type: "nft_minted",
      message: "Minted NFT 'Digital Portrait #042'",
      timestamp: "2 days ago",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 apple-blur sticky top-0 z-50">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xl font-semibold tracking-tight">Studio</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Button asChild>
                <Link href="/design">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Welcome back, {user.name.split(" ")[0]}</h1>
              <p className="text-muted-foreground mt-1">Here's what's happening with your projects today.</p>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              <Star className="w-3 h-3 mr-1" />
              {user.plan} Plan
            </Badge>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 bg-card/50 apple-blur apple-shadow">
              <CardHeader className="pb-2">
                <CardDescription>Active Projects</CardDescription>
                <CardTitle className="text-2xl">12</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/50 apple-blur apple-shadow">
              <CardHeader className="pb-2">
                <CardDescription>AI Generations</CardDescription>
                <CardTitle className="text-2xl">1,247</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">+156 this week</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/50 apple-blur apple-shadow">
              <CardHeader className="pb-2">
                <CardDescription>Collaborators</CardDescription>
                <CardTitle className="text-2xl">8</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Across all projects</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/50 apple-blur apple-shadow">
              <CardHeader className="pb-2">
                <CardDescription>NFTs Minted</CardDescription>
                <CardTitle className="text-2xl">24</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Total value: 156.8 SOL</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="projects">
              <Palette className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="activity">
              <Clock className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Projects</h2>
              <Button variant="outline" asChild>
                <Link href="/projects">View All</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 apple-blur overflow-hidden"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.thumbnail || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="sm" className="h-8 w-8 p-0 bg-white/90 apple-blur">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-1">{project.name}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline" className="text-xs">
                            {project.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{project.lastModified}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{project.collaborators} collaborators</span>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/workspace/${project.id}`}>Open</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Card className="border-0 bg-card/50 apple-blur apple-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        {activity.type === "project_created" && <Palette className="w-4 h-4 text-primary" />}
                        {activity.type === "collaboration" && <Users className="w-4 h-4 text-primary" />}
                        {activity.type === "ai_generation" && <Zap className="w-4 h-4 text-primary" />}
                        {activity.type === "nft_minted" && <ImageIcon className="w-4 h-4 text-primary" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold">Analytics Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 bg-card/50 apple-blur apple-shadow">
                <CardHeader>
                  <CardTitle>Project Performance</CardTitle>
                  <CardDescription>Views and engagement over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    <TrendingUp className="w-8 h-8 mr-2" />
                    Analytics chart would go here
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50 apple-blur apple-shadow">
                <CardHeader>
                  <CardTitle>AI Usage</CardTitle>
                  <CardDescription>Generation trends and usage patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    <Zap className="w-8 h-8 mr-2" />
                    Usage chart would go here
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
