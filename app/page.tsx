import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Search, Settings, Bell, User, Palette, Zap, Users, Shield, ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background smooth-scroll">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 apple-blur sticky top-0 z-50 mobile-header">
        <div className="container mx-auto mobile-safe py-3 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <span className="text-lg sm:text-xl font-semibold tracking-tight">Designs</span>
              </div>

              <nav className="hidden lg:flex items-center gap-6">
                <Button variant="ghost" size="sm" className="apple-button" asChild>
                  <Link href="/studio">Studio</Link>
                </Button>
                <Button variant="ghost" size="sm" className="apple-button" asChild>
                  <Link href="/studio/create">Create</Link>
                </Button>
                <Button variant="ghost" size="sm" className="apple-button" asChild>
                  <Link href="/studio/create/templates">Templates</Link>
                </Button>
                <Button variant="ghost" size="sm" className="apple-button" asChild>
                  <Link href="/studio/marketplace">Marketplace</Link>
                </Button>
              </nav>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search projects, templates..." className="pl-10 w-64 xl:w-80" />
              </div>

              <Button size="sm" variant="outline" className="apple-button hidden sm:flex bg-transparent">
                <Bell className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="apple-button hidden sm:flex bg-transparent">
                <Settings className="w-4 h-4" />
              </Button>
              <Button size="sm" className="apple-button" asChild>
                <Link href="/account/login">
                  <User className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto mobile-safe py-8 sm:py-12">
        {/* Hero Section */}
        <section className="text-center py-8 sm:py-16 mb-8 sm:mb-16">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <Badge variant="secondary" className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Powered by AI & Blockchain
              </Badge>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent leading-tight">
                Create anything with AI
              </h1>
              <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                The next-level design studio that combines AI generation, real-time collaboration, and blockchain
                technology for the future of creative work.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <Button size="lg" className="h-11 sm:h-12 px-6 sm:px-8 w-full sm:w-auto apple-button" asChild>
                <Link href="/account/signup">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 sm:h-12 px-6 sm:px-8 w-full sm:w-auto bg-transparent apple-button"
                asChild
              >
                <Link href="/studio/create">
                  <Play className="w-4 h-4 mr-2" />
                  Try AI Generation
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-16">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">
              Everything you need to create
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              Professional tools, AI assistance, and blockchain security in one unified platform
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <Card className="border-0 bg-card/50 apple-blur apple-shadow text-center apple-button">
              <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <CardTitle className="text-base sm:text-lg">AI Generation</CardTitle>
                <CardDescription className="text-sm">
                  Generate stunning visuals, copy, and designs with advanced AI models
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-card/50 apple-blur apple-shadow text-center apple-button">
              <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <CardTitle className="text-base sm:text-lg">Real-time Collaboration</CardTitle>
                <CardDescription className="text-sm">
                  Work together seamlessly with live cursors, comments, and shared workspaces
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-card/50 apple-blur apple-shadow text-center apple-button">
              <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <CardTitle className="text-base sm:text-lg">Professional Tools</CardTitle>
                <CardDescription className="text-sm">
                  Complete design suite with layers, effects, and precision controls
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-card/50 apple-blur apple-shadow text-center apple-button">
              <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <CardTitle className="text-base sm:text-lg">Blockchain Security</CardTitle>
                <CardDescription className="text-sm">
                  Secure ownership and monetize your creations with NFT minting on Solana
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="py-8 sm:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3 sm:mb-4">Start creating today</h2>
            <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
              Jump into any workflow that matches your creative process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 apple-blur overflow-hidden apple-button">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20" />
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Design Studio</h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  Professional design tools with AI assistance and real-time collaboration
                </p>
                <Button className="w-full apple-button" asChild>
                  <Link href="/studio/create/design">Start Designing</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 apple-blur overflow-hidden apple-button">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20" />
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Template Library</h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  Browse hundreds of professional templates for every project type
                </p>
                <Button className="w-full bg-transparent apple-button" variant="outline" asChild>
                  <Link href="/studio/create/templates">Browse Templates</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 apple-blur overflow-hidden apple-button">
              <div className="aspect-video bg-gradient-to-br from-secondary/20 to-accent/20" />
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Blockchain Hub</h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  Mint NFTs, manage digital assets, and secure your creative ownership
                </p>
                <Button className="w-full bg-transparent apple-button" variant="outline" asChild>
                  <Link href="/studio/marketplace">Explore Marketplace</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
