"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Search,
  Upload,
  Filter,
  Grid3X3,
  List,
  Download,
  Share2,
  MoreHorizontal,
  ImageIcon,
  FileText,
  Music,
  Video,
  Palette,
  Folder,
  Star,
  Eye,
  Heart,
} from "lucide-react"
import Link from "next/link"

const assetCategories = [
  { id: "all", name: "All Assets", icon: Grid3X3, count: 1247 },
  { id: "images", name: "Images", icon: ImageIcon, count: 456 },
  { id: "icons", name: "Icons", icon: Palette, count: 234 },
  { id: "fonts", name: "Fonts", icon: FileText, count: 89 },
  { id: "audio", name: "Audio", icon: Music, count: 167 },
  { id: "video", name: "Video", icon: Video, count: 301 },
]

const mockAssets = [
  {
    id: "1",
    name: "Abstract Gradient Background",
    type: "image",
    category: "images",
    size: "2.4 MB",
    dimensions: "1920x1080",
    format: "PNG",
    thumbnail: "/placeholder.svg?height=200&width=200",
    author: "Design Team",
    downloads: 1234,
    likes: 89,
    tags: ["gradient", "abstract", "background"],
    isPremium: false,
  },
  {
    id: "2",
    name: "Modern Icon Set",
    type: "icon",
    category: "icons",
    size: "156 KB",
    dimensions: "24x24",
    format: "SVG",
    thumbnail: "/placeholder.svg?height=200&width=200",
    author: "Sarah Chen",
    downloads: 856,
    likes: 67,
    tags: ["icons", "modern", "ui"],
    isPremium: true,
  },
  {
    id: "3",
    name: "Montserrat Font Family",
    type: "font",
    category: "fonts",
    size: "1.2 MB",
    dimensions: "Variable",
    format: "TTF",
    thumbnail: "/placeholder.svg?height=200&width=200",
    author: "Google Fonts",
    downloads: 2341,
    likes: 156,
    tags: ["font", "sans-serif", "modern"],
    isPremium: false,
  },
  {
    id: "4",
    name: "Ambient Background Music",
    type: "audio",
    category: "audio",
    size: "8.7 MB",
    dimensions: "3:24",
    format: "MP3",
    thumbnail: "/placeholder.svg?height=200&width=200",
    author: "Audio Studio",
    downloads: 543,
    likes: 34,
    tags: ["ambient", "background", "music"],
    isPremium: true,
  },
  {
    id: "5",
    name: "Product Demo Video",
    type: "video",
    category: "video",
    size: "45.2 MB",
    dimensions: "1920x1080",
    format: "MP4",
    thumbnail: "/placeholder.svg?height=200&width=200",
    author: "Video Team",
    downloads: 234,
    likes: 23,
    tags: ["demo", "product", "video"],
    isPremium: false,
  },
  {
    id: "6",
    name: "Texture Pack Collection",
    type: "image",
    category: "images",
    size: "12.8 MB",
    dimensions: "Various",
    format: "JPG",
    thumbnail: "/placeholder.svg?height=200&width=200",
    author: "Texture Studio",
    downloads: 987,
    likes: 78,
    tags: ["texture", "collection", "material"],
    isPremium: true,
  },
]

export default function AssetsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "image":
        return ImageIcon
      case "icon":
        return Palette
      case "font":
        return FileText
      case "audio":
        return Music
      case "video":
        return Video
      default:
        return FileText
    }
  }

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
                  <Folder className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold tracking-tight">Asset Library</h1>
                  <p className="text-sm text-muted-foreground">High-quality assets for your projects</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets..."
                  className="pl-10 w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload Asset
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
                <CardTitle className="text-lg">Asset Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {assetCategories.map((category) => {
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

            {/* Recent Uploads */}
            <Card className="border-0 bg-card/50 apple-blur apple-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Recent Uploads</CardTitle>
                <CardDescription>Your latest asset uploads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAssets.slice(0, 3).map((asset) => {
                  const Icon = getAssetIcon(asset.type)
                  return (
                    <div key={asset.id} className="flex gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">{asset.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {asset.format} • {asset.size}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Download className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{asset.downloads}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
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
                    ? "All Assets"
                    : assetCategories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <Badge variant="secondary" className="px-3 py-1">
                  {filteredAssets.length} assets
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>

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

            {/* Assets Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
              {filteredAssets.map((asset) => {
                const Icon = getAssetIcon(asset.type)
                return (
                  <Card
                    key={asset.id}
                    className={`group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 apple-blur overflow-hidden ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "list" ? "w-24 flex-shrink-0" : "aspect-square"
                      }`}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>

                      {asset.isPremium && (
                        <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Pro
                        </Badge>
                      )}

                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" className="h-8 w-8 p-0 bg-white/90 apple-blur">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Heart className="w-4 h-4 mr-2" />
                              Add to Favorites
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <CardContent className={`${viewMode === "list" ? "flex-1" : ""} p-4`}>
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold line-clamp-1">{asset.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {asset.format} • {asset.size}
                            {asset.dimensions && ` • ${asset.dimensions}`}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>by {asset.author}</span>
                          <span>•</span>
                          <span>{asset.downloads.toLocaleString()} downloads</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {asset.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{asset.likes}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
