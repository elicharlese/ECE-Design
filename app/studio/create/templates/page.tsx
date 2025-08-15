"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Download,
  Eye,
  Heart,
  Layout,
  Smartphone,
  Monitor,
  FileText,
  ImageIcon,
} from "lucide-react"
import Link from "next/link"

const templateCategories = [
  { id: "all", name: "All Templates", icon: Grid3X3, count: 247 },
  { id: "web", name: "Web Design", icon: Monitor, count: 89 },
  { id: "mobile", name: "Mobile Apps", icon: Smartphone, count: 56 },
  { id: "print", name: "Print Design", icon: FileText, count: 34 },
  { id: "social", name: "Social Media", icon: ImageIcon, count: 68 },
]

const mockTemplates = [
  {
    id: "1",
    name: "Modern Landing Page",
    category: "web",
    description: "Clean and modern landing page template with hero section and features",
    thumbnail: "/placeholder.svg?height=240&width=320",
    author: "Design Team",
    downloads: 1234,
    likes: 89,
    rating: 4.8,
    tags: ["landing", "modern", "business"],
    isPremium: false,
  },
  {
    id: "2",
    name: "Mobile Banking App",
    category: "mobile",
    description: "Complete mobile banking app design with dashboard and transactions",
    thumbnail: "/placeholder.svg?height=240&width=320",
    author: "Sarah Chen",
    downloads: 856,
    likes: 67,
    rating: 4.9,
    tags: ["mobile", "banking", "fintech"],
    isPremium: true,
  },
  {
    id: "3",
    name: "Brand Identity Kit",
    category: "print",
    description: "Complete brand identity package with logo, colors, and guidelines",
    thumbnail: "/placeholder.svg?height=240&width=320",
    author: "Alex Rivera",
    downloads: 2341,
    likes: 156,
    rating: 4.7,
    tags: ["branding", "identity", "logo"],
    isPremium: false,
  },
  {
    id: "4",
    name: "Instagram Story Pack",
    category: "social",
    description: "Trendy Instagram story templates for social media marketing",
    thumbnail: "/placeholder.svg?height=240&width=320",
    author: "Jordan Kim",
    downloads: 3456,
    likes: 234,
    rating: 4.6,
    tags: ["instagram", "social", "stories"],
    isPremium: true,
  },
  {
    id: "5",
    name: "Dashboard UI Kit",
    category: "web",
    description: "Comprehensive dashboard UI kit with charts and components",
    thumbnail: "/placeholder.svg?height=240&width=320",
    author: "Taylor Swift",
    downloads: 1876,
    likes: 123,
    rating: 4.8,
    tags: ["dashboard", "ui", "admin"],
    isPremium: false,
  },
  {
    id: "6",
    name: "E-commerce Mobile",
    category: "mobile",
    description: "Modern e-commerce mobile app with product catalog and checkout",
    thumbnail: "/placeholder.svg?height=240&width=320",
    author: "Design Team",
    downloads: 987,
    likes: 78,
    rating: 4.5,
    tags: ["ecommerce", "mobile", "shopping"],
    isPremium: true,
  },
]

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 apple-blur sticky top-0 z-50">
        <div className="container mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Studio
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Layout className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold tracking-tight">Template Library</h1>
                  <p className="text-sm text-muted-foreground">Professional templates for every project</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10 w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-72 space-y-6">
            {/* Categories */}
            <Card className="border-0 bg-card/50 apple-blur apple-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {templateCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "secondary" : "ghost"}
                      className="w-full justify-start h-10"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      <span className="flex-1 text-left">{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Featured Templates */}
            <Card className="border-0 bg-card/50 apple-blur apple-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Featured</CardTitle>
                <CardDescription>Hand-picked by our design team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockTemplates.slice(0, 3).map((template) => (
                  <div key={template.id} className="flex gap-3">
                    <div className="w-16 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-1">{template.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{template.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold">
                  {selectedCategory === "all"
                    ? "All Templates"
                    : templateCategories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <Badge variant="secondary" className="px-3 py-1">
                  {filteredTemplates.length} templates
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="downloads">Most Downloaded</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Templates Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 apple-blur overflow-hidden ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-video"
                    }`}
                  >
                    <img
                      src={template.thumbnail || "/placeholder.svg"}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                    {template.isPremium && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Pro
                      </Badge>
                    )}

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-2">
                        <Button size="sm" className="h-8 w-8 p-0 bg-white/90 apple-blur">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="h-8 w-8 p-0 bg-white/90 apple-blur">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="w-full bg-white/90 apple-blur text-foreground hover:bg-white">
                        <Download className="w-4 h-4 mr-2" />
                        Use Template
                      </Button>
                    </div>
                  </div>

                  <CardContent className={`${viewMode === "list" ? "flex-1" : ""} p-4`}>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-1">{template.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>by {template.author}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{template.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{template.downloads.toLocaleString()} downloads</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{template.likes}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
