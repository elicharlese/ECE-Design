"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Wallet, Coins, Image, History, ExternalLink, Copy, Zap, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"
import { WalletConnect } from "@/components/wallet-connect"
import { NFTCard } from "@/components/nft-card"
import { TransactionHistory } from "@/components/transaction-history"

export default function BlockchainPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [balance, setBalance] = useState(0)
  const [activeTab, setActiveTab] = useState("wallet")

  // Mock NFT data
  const mockNFTs = [
    {
      id: "1",
      name: "AI Generated Landscape #001",
      image: "/placeholder.svg?height=300&width=300",
      price: 2.5,
      creator: "You",
      views: 1234,
      likes: 89,
      minted: "2024-01-15",
    },
    {
      id: "2",
      name: "Digital Portrait Series #042",
      image: "/placeholder.svg?height=300&width=300",
      price: 1.8,
      creator: "Sarah Chen",
      views: 856,
      likes: 67,
      minted: "2024-01-14",
    },
    {
      id: "3",
      name: "Abstract Composition #128",
      image: "/placeholder.svg?height=300&width=300",
      price: 3.2,
      creator: "Alex Rivera",
      views: 2341,
      likes: 156,
      minted: "2024-01-13",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
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
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xl font-semibold">Blockchain Hub</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">
                      <Zap className="w-3 h-3 mr-1" />
                      Solana Network
                    </Badge>
                    <span>Secure • Decentralized • Fast</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <WalletConnect
                isConnected={isConnected}
                onConnect={(address) => {
                  setIsConnected(true)
                  setWalletAddress(address)
                  setBalance(12.45) // Mock balance
                }}
                onDisconnect={() => {
                  setIsConnected(false)
                  setWalletAddress("")
                  setBalance(0)
                }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {!isConnected ? (
          /* Wallet Connection Landing */
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Wallet className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connect your Solana wallet to mint NFTs, trade digital assets, and secure your creative work on the
              blockchain.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Secure Ownership</CardTitle>
                  <CardDescription>
                    Your designs are secured on the Solana blockchain with immutable proof of ownership
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">Fast Transactions</CardTitle>
                  <CardDescription>
                    Lightning-fast minting and trading with minimal fees on Solana network
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Monetize Creations</CardTitle>
                  <CardDescription>
                    Turn your AI-generated art into valuable NFTs and build a creative economy
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <WalletConnect
              isConnected={isConnected}
              onConnect={(address) => {
                setIsConnected(true)
                setWalletAddress(address)
                setBalance(12.45)
              }}
              onDisconnect={() => {
                setIsConnected(false)
                setWalletAddress("")
                setBalance(0)
              }}
              size="lg"
            />
          </div>
        ) : (
          /* Connected Wallet Dashboard */
          <div className="space-y-8">
            {/* Wallet Overview */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Wallet Balance</CardDescription>
                  <CardTitle className="text-2xl">{balance} SOL</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">≈ ${(balance * 98.5).toFixed(2)} USD</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardDescription>NFTs Owned</CardDescription>
                  <CardTitle className="text-2xl">24</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">+3 this month</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Total Sales</CardDescription>
                  <CardTitle className="text-2xl">156.8 SOL</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">+12.3% this week</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Royalties Earned</CardDescription>
                  <CardTitle className="text-2xl">8.4 SOL</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">From 12 NFTs</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 max-w-md">
                <TabsTrigger value="wallet">
                  <Wallet className="w-4 h-4 mr-2" />
                  Wallet
                </TabsTrigger>
                <TabsTrigger value="nfts">
                  <Image className="w-4 h-4 mr-2" />
                  NFTs
                </TabsTrigger>
                <TabsTrigger value="mint">
                  <Zap className="w-4 h-4 mr-2" />
                  Mint
                </TabsTrigger>
                <TabsTrigger value="history">
                  <History className="w-4 h-4 mr-2" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="wallet" className="space-y-6">
                <Card className="border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Wallet Details</CardTitle>
                    <CardDescription>Your Solana wallet information and quick actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <Label className="text-sm font-medium">Wallet Address</Label>
                        <p className="font-mono text-sm text-muted-foreground">{walletAddress}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button className="h-12">
                        <Coins className="w-4 h-4 mr-2" />
                        Buy SOL
                      </Button>
                      <Button variant="outline" className="h-12 bg-transparent">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on Explorer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="nfts" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Your NFT Collection</h2>
                  <Button>
                    <Zap className="w-4 h-4 mr-2" />
                    Mint New NFT
                  </Button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockNFTs.map((nft) => (
                    <NFTCard key={nft.id} nft={nft} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="mint" className="space-y-6">
                <Card className="border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Mint New NFT</CardTitle>
                    <CardDescription>Turn your AI-generated designs into valuable NFTs on Solana</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="nft-name">NFT Name</Label>
                          <Input id="nft-name" placeholder="My Amazing AI Art" className="mt-2" />
                        </div>

                        <div>
                          <Label htmlFor="nft-description">Description</Label>
                          <Textarea
                            id="nft-description"
                            placeholder="Describe your NFT..."
                            className="mt-2 min-h-[100px]"
                          />
                        </div>

                        <div>
                          <Label htmlFor="nft-price">Price (SOL)</Label>
                          <Input id="nft-price" type="number" placeholder="1.5" className="mt-2" />
                        </div>

                        <div>
                          <Label htmlFor="royalty">Royalty (%)</Label>
                          <Input id="royalty" type="number" placeholder="5" max="10" className="mt-2" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="aspect-square bg-muted/50 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                          <div className="text-center">
                            <Image className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Upload your artwork</p>
                            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                              Choose File
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-medium mb-2">Minting Cost</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Network Fee:</span>
                              <span>0.01 SOL</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Platform Fee:</span>
                              <span>0.02 SOL</span>
                            </div>
                            <div className="flex justify-between font-medium border-t border-border pt-1 mt-2">
                              <span>Total:</span>
                              <span>0.03 SOL</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full h-12" size="lg">
                      <Zap className="w-5 h-5 mr-2" />
                      Mint NFT for 0.03 SOL
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <TransactionHistory />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
