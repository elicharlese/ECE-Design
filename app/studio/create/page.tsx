"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Sparkles,
  ImageIcon,
  Type,
  Palette,
  Download,
  Share2,
  Settings,
  Wand2,
  ArrowLeft,
  Copy,
  Heart,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("image")

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock generated content
    if (activeTab === "image") {
      setGeneratedContent(`/placeholder.svg?height=512&width=512&query=${encodeURIComponent(prompt)}`)
    } else {
      setGeneratedContent("This is AI-generated content based on your prompt: " + prompt)
    }

    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 apple-blur sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/studio">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Studio
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Wand2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-xl font-semibold tracking-tight">AI Generator</span>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="text-xs font-medium px-2 py-1">
                      <Sparkles className="w-3 h-3 mr-1.5" />
                      Create Hub
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" className="apple-button" asChild>
                  <Link href="/studio/create/design">Design Tools</Link>
                </Button>
                <Button variant="ghost" size="sm" className="apple-button" asChild>
                  <Link href="/studio/create/templates">Templates</Link>
                </Button>
              </nav>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="apple-button bg-transparent">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="apple-button bg-transparent">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generation Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 bg-card/50 apple-blur apple-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Generation
                </CardTitle>
                <CardDescription>Describe what you want to create and let AI bring it to life</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Content Type Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="image" className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Image
                    </TabsTrigger>
                    <TabsTrigger value="text" className="flex items-center gap-2">
                      <Type className="w-4 h-4" />
                      Text
                    </TabsTrigger>
                    <TabsTrigger value="design" className="flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Design
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="image" className="space-y-4">
                    <div>
                      <Label htmlFor="prompt">Describe your image</Label>
                      <Textarea
                        id="prompt"
                        placeholder="A futuristic cityscape at sunset with flying cars and neon lights..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[100px] mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Style</Label>
                        <Select>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Choose style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="photorealistic">Photorealistic</SelectItem>
                            <SelectItem value="artistic">Artistic</SelectItem>
                            <SelectItem value="cartoon">Cartoon</SelectItem>
                            <SelectItem value="abstract">Abstract</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Aspect Ratio</Label>
                        <Select>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="1:1" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1:1">Square (1:1)</SelectItem>
                            <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                            <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                            <SelectItem value="4:3">Classic (4:3)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Quality</Label>
                      <div className="mt-2">
                        <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Fast</span>
                          <span>High Quality</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="text" className="space-y-4">
                    <div>
                      <Label htmlFor="text-prompt">What do you need written?</Label>
                      <Textarea
                        id="text-prompt"
                        placeholder="Write a compelling product description for a smart home device..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[100px] mt-2"
                      />
                    </div>

                    <div>
                      <Label>Content Type</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Choose type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blog">Blog Post</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="email">Email Copy</SelectItem>
                          <SelectItem value="product">Product Description</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Tone</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Professional" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="design" className="space-y-4">
                    <div>
                      <Label htmlFor="design-prompt">Describe your design</Label>
                      <Textarea
                        id="design-prompt"
                        placeholder="A minimalist logo for a tech startup with clean lines and modern typography..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[100px] mt-2"
                      />
                    </div>

                    <div>
                      <Label>Design Type</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Choose type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="logo">Logo</SelectItem>
                          <SelectItem value="banner">Banner</SelectItem>
                          <SelectItem value="poster">Poster</SelectItem>
                          <SelectItem value="ui">UI Elements</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="vector">Vector Format</Label>
                      <Switch id="vector" />
                    </div>
                  </TabsContent>
                </Tabs>

                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full apple-button"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Recent Generations */}
            <Card className="border-0 bg-card/50 apple-blur apple-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Recent Generations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer apple-button"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Generated image {i}</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generation Results */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-card/50 apple-blur apple-shadow h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Generated Content</CardTitle>
                  {generatedContent && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Generated
                      </Badge>
                      <Button variant="outline" size="sm" className="apple-button bg-transparent">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="apple-button bg-transparent">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="apple-button bg-transparent">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="apple-button bg-transparent">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                {!generatedContent && !isGenerating && (
                  <div className="flex flex-col items-center justify-center h-96 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Wand2 className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Ready to create</h3>
                    <p className="text-muted-foreground max-w-md">
                      Enter a prompt and select your preferences to generate amazing content with AI
                    </p>
                  </div>
                )}

                {isGenerating && (
                  <div className="flex flex-col items-center justify-center h-96 text-center">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                    <h3 className="text-lg font-medium mb-2">Generating your content</h3>
                    <p className="text-muted-foreground">This may take a few moments...</p>
                  </div>
                )}

                {generatedContent && activeTab === "image" && (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={generatedContent || "/placeholder.svg"}
                        alt="Generated content"
                        className="w-full rounded-lg apple-shadow-lg"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Generated from: "{prompt}"</span>
                      <span>512x512 • PNG</span>
                    </div>
                  </div>
                )}

                {generatedContent && activeTab !== "image" && (
                  <div className="space-y-4">
                    <div className="p-6 bg-muted/50 rounded-lg">
                      <p className="text-foreground leading-relaxed">{generatedContent}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Generated from: "{prompt}"</span>
                      <span>{generatedContent.length} characters</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
