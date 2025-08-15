"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Wallet, ExternalLink, Copy, LogOut } from "lucide-react"

interface WalletConnectProps {
  isConnected: boolean
  onConnect: (address: string) => void
  onDisconnect: () => void
  size?: "sm" | "default" | "lg"
}

const mockWallets = [
  {
    name: "Phantom",
    icon: "/placeholder.svg?height=40&width=40",
    description: "The most popular Solana wallet",
    installed: true,
  },
  {
    name: "Solflare",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Secure Solana wallet with staking",
    installed: false,
  },
  {
    name: "Backpack",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Multi-chain wallet for Solana",
    installed: false,
  },
  {
    name: "Glow",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Simple and secure Solana wallet",
    installed: false,
  },
]

export function WalletConnect({ isConnected, onConnect, onDisconnect, size = "default" }: WalletConnectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async (walletName: string) => {
    setIsConnecting(true)
    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock wallet address
    const mockAddress = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
    onConnect(mockAddress)
    setIsConnecting(false)
    setIsOpen(false)
  }

  if (isConnected) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size={size} className="gap-2 bg-transparent">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="font-mono text-sm">7xKX...gAsU</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Wallet Connected</DialogTitle>
            <DialogDescription>Your Phantom wallet is successfully connected</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <img src="/placeholder.svg?height=40&width=40" alt="Phantom" className="w-10 h-10 rounded-lg" />
              <div className="flex-1">
                <p className="font-medium">Phantom Wallet</p>
                <p className="text-sm text-muted-foreground font-mono">7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU</p>
              </div>
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Explorer
              </Button>
              <Button variant="destructive" onClick={onDisconnect}>
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={size} className="gap-2">
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>Choose a wallet to connect to the Solana network</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {mockWallets.map((wallet) => (
            <Card
              key={wallet.name}
              className={`cursor-pointer transition-all hover:shadow-md border-0 bg-card/50 ${
                !wallet.installed ? "opacity-60" : ""
              }`}
              onClick={() => wallet.installed && handleConnect(wallet.name)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <img src={wallet.icon || "/placeholder.svg"} alt={wallet.name} className="w-10 h-10 rounded-lg" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{wallet.name}</h3>
                      {wallet.installed && (
                        <Badge variant="secondary" className="text-xs">
                          Installed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{wallet.description}</p>
                  </div>
                  {isConnecting ? (
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  ) : !wallet.installed ? (
                    <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                      Install
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
