"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Square,
  Circle,
  Type,
  ImageIcon,
  Folder,
  FolderOpen,
  Plus,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

interface LayersPanelProps {
  selectedElement: string | null
  onElementSelect: (elementId: string | null) => void
}

const mockLayers = [
  {
    id: "group1",
    name: "Header Section",
    type: "group",
    visible: true,
    locked: false,
    expanded: true,
    children: [
      { id: "text1", name: "Sample Text", type: "text", visible: true, locked: false },
      { id: "rect1", name: "Background", type: "rectangle", visible: true, locked: false },
    ],
  },
  {
    id: "group2",
    name: "Content Area",
    type: "group",
    visible: true,
    locked: false,
    expanded: false,
    children: [
      { id: "circle1", name: "Icon Circle", type: "circle", visible: true, locked: false },
      { id: "image1", name: "Hero Image", type: "image", visible: true, locked: true },
    ],
  },
  { id: "bg", name: "Background", type: "rectangle", visible: true, locked: true },
]

export function LayersPanel({ selectedElement, onElementSelect }: LayersPanelProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(["group1"]))

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId)
    } else {
      newExpanded.add(groupId)
    }
    setExpandedGroups(newExpanded)
  }

  const getLayerIcon = (type: string) => {
    switch (type) {
      case "rectangle":
        return Square
      case "circle":
        return Circle
      case "text":
        return Type
      case "image":
        return ImageIcon
      case "group":
        return expandedGroups.has("group1") ? FolderOpen : Folder
      default:
        return Square
    }
  }

  const renderLayer = (layer: any, depth = 0) => {
    const Icon = getLayerIcon(layer.type)
    const isSelected = selectedElement === layer.id

    return (
      <div key={layer.id}>
        <div
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted/50 ${
            isSelected ? "bg-primary/10 border border-primary/20" : ""
          }`}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => onElementSelect(layer.id)}
        >
          {layer.type === "group" && (
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0"
              onClick={(e) => {
                e.stopPropagation()
                toggleGroup(layer.id)
              }}
            >
              {expandedGroups.has(layer.id) ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </Button>
          )}
          <Icon className="w-4 h-4 text-muted-foreground" />
          <span className="flex-1 text-sm truncate">{layer.name}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            {layer.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            {layer.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
          </Button>
        </div>

        {layer.children && expandedGroups.has(layer.id) && (
          <div>{layer.children.map((child: any) => renderLayer(child, depth + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <Card className="h-full border-0 bg-transparent rounded-none">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Layers</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-4 space-y-1 group">{mockLayers.map((layer) => renderLayer(layer))}</div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
