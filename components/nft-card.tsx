"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Eye, Heart, Share2, MoreHorizontal, Coins } from "lucide-react"

interface NFT {
  id: string
  name: string
  image: string
  price: number
  creator: string
  views: number
  likes: number
  minted: string
}

interface NFTCardProps {
  nft: NFT
}

export function NFTCard({ nft }: NFTCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
      <div className="aspect-square relative overflow-hidden">
        <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="sm" className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="bg-white/90 backdrop-blur-sm">
              <Eye className="w-4 h-4 mr-1" />
              {nft.views}
            </Button>
            <Button variant="secondary" size="sm" className="bg-white/90 backdrop-blur-sm">
              <Heart className="w-4 h-4 mr-1" />
              {nft.likes}
            </Button>
            <Button variant="secondary" size="sm" className="bg-white/90 backdrop-blur-sm ml-auto">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{nft.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="w-5 h-5">
                <AvatarFallback className="text-xs">
                  {nft.creator
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">by {nft.creator}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Coins className="w-4 h-4 text-primary" />
              <span className="font-semibold">{nft.price} SOL</span>
            </div>
            <Badge variant="outline" className="text-xs">
              Minted {nft.minted}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              View Details
            </Button>
            <Button size="sm" className="flex-1">
              <Coins className="w-4 h-4 mr-1" />
              Sell
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
