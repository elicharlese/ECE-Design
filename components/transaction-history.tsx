"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUpRight, ArrowDownLeft, Zap, ExternalLink, Copy } from "lucide-react"

const mockTransactions = [
  {
    id: "1",
    type: "mint",
    description: "Minted AI Generated Landscape #001",
    amount: -0.03,
    status: "confirmed",
    timestamp: "2024-01-15 14:30",
    hash: "5KJp9X2vR8qN3mL7wY4tE6uH9sA1bC3dF2gH8jK5mN7pQ9rS2tU4vW6xY8zA1bC3",
  },
  {
    id: "2",
    type: "sale",
    description: "Sold Digital Portrait Series #042",
    amount: +1.8,
    status: "confirmed",
    timestamp: "2024-01-14 16:45",
    hash: "7MNq2Y4xS9rP5oM8zB6vH3kJ1dG4fI7lK0nQ3sT6uW9yA2cE5gI8jL1nP4rT7wZ0",
  },
  {
    id: "3",
    type: "purchase",
    description: "Purchased Abstract Composition #128",
    amount: -3.2,
    status: "confirmed",
    timestamp: "2024-01-13 11:20",
    hash: "9PQs4Z6yU1tR7qO0zC8wI5mL2eH6gJ9kN3pS6vY9aB2dF5hK8lO1qT4wX7zA0cE3",
  },
  {
    id: "4",
    type: "royalty",
    description: "Royalty from AI Generated Landscape #001",
    amount: +0.15,
    status: "confirmed",
    timestamp: "2024-01-12 09:15",
    hash: "2EFh8K1nQ4sT7wZ0cE3gI6jL9oR2uX5yB8dG1kN4pS7vY0aC3fI6lO9rU2xA5cH8",
  },
  {
    id: "5",
    type: "transfer",
    description: "Transferred 5.0 SOL to wallet",
    amount: +5.0,
    status: "pending",
    timestamp: "2024-01-11 18:30",
    hash: "4GHj1L4oR7uX0aD3gI6kN9qT2wZ5cF8hK1nP4sV7yB0eH3jM6pS9vY2aC5fI8lO1",
  },
]

export function TransactionHistory() {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "mint":
        return <Zap className="w-4 h-4 text-primary" />
      case "sale":
      case "royalty":
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />
      case "purchase":
        return <ArrowUpRight className="w-4 h-4 text-red-500" />
      case "transfer":
        return <ArrowDownLeft className="w-4 h-4 text-blue-500" />
      default:
        return <ArrowUpRight className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500"
      case "failed":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-muted/10 text-muted-foreground"
    }
  }

  return (
    <Card className="border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Your recent blockchain transactions and activities</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0">{getTransactionIcon(transaction.type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm truncate">{transaction.description}</p>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{transaction.timestamp}</span>
                    <span className="font-mono truncate max-w-[200px]">{transaction.hash}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount} SOL
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
