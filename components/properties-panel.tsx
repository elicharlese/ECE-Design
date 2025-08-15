"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Palette,
  Type,
  Layout,
  Layers,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RotateCw,
} from "lucide-react"
import { ColorPicker } from "@/components/color-picker"

interface PropertiesPanelProps {
  selectedElement: string | null
}

export function PropertiesPanel({ selectedElement }: PropertiesPanelProps) {
  const [fillColor, setFillColor] = useState("#0891b2")
  const [strokeColor, setStrokeColor] = useState("#000000")
  const [opacity, setOpacity] = useState([100])
  const [borderRadius, setBorderRadius] = useState([8])
  const [strokeWidth, setStrokeWidth] = useState([2])

  if (!selectedElement) {
    return (
      <Card className="h-full border-0 bg-transparent rounded-none">
        <CardContent className="p-6 flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <Layers className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select an element to edit properties</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full border-0 bg-transparent rounded-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Properties</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-4 space-y-6">
            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="appearance">
                  <Palette className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="layout">
                  <Layout className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="text">
                  <Type className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="appearance" className="space-y-4 mt-4">
                {/* Fill Color */}
                <div className="space-y-2">
                  <Label>Fill</Label>
                  <ColorPicker color={fillColor} onChange={setFillColor} />
                </div>

                {/* Stroke */}
                <div className="space-y-2">
                  <Label>Stroke</Label>
                  <div className="flex gap-2">
                    <ColorPicker color={strokeColor} onChange={setStrokeColor} />
                    <div className="flex-1">
                      <Label className="text-xs">Width</Label>
                      <Slider value={strokeWidth} onValueChange={setStrokeWidth} max={20} step={1} className="mt-1" />
                    </div>
                  </div>
                </div>

                {/* Opacity */}
                <div className="space-y-2">
                  <Label>Opacity</Label>
                  <Slider value={opacity} onValueChange={setOpacity} max={100} step={1} />
                  <div className="text-xs text-muted-foreground text-right">{opacity[0]}%</div>
                </div>

                {/* Border Radius */}
                <div className="space-y-2">
                  <Label>Border Radius</Label>
                  <Slider value={borderRadius} onValueChange={setBorderRadius} max={50} step={1} />
                  <div className="text-xs text-muted-foreground text-right">{borderRadius[0]}px</div>
                </div>

                {/* Effects */}
                <div className="space-y-2">
                  <Label>Effects</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      Drop Shadow
                    </Button>
                    <Button variant="outline" size="sm">
                      Inner Shadow
                    </Button>
                    <Button variant="outline" size="sm">
                      Blur
                    </Button>
                    <Button variant="outline" size="sm">
                      Glow
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="layout" className="space-y-4 mt-4">
                {/* Position */}
                <div className="space-y-2">
                  <Label>Position</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">X</Label>
                      <Input type="number" defaultValue="100" className="h-8" />
                    </div>
                    <div>
                      <Label className="text-xs">Y</Label>
                      <Input type="number" defaultValue="200" className="h-8" />
                    </div>
                  </div>
                </div>

                {/* Size */}
                <div className="space-y-2">
                  <Label>Size</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Width</Label>
                      <Input type="number" defaultValue="128" className="h-8" />
                    </div>
                    <div>
                      <Label className="text-xs">Height</Label>
                      <Input type="number" defaultValue="128" className="h-8" />
                    </div>
                  </div>
                </div>

                {/* Rotation */}
                <div className="space-y-2">
                  <Label>Rotation</Label>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue="0" className="h-8" />
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                      <RotateCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Alignment */}
                <div className="space-y-2">
                  <Label>Alignment</Label>
                  <div className="grid grid-cols-3 gap-1">
                    <Button variant="outline" size="sm">
                      <AlignLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <AlignCenter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <AlignRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4 mt-4">
                {/* Font Family */}
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="DM Sans" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dm-sans">DM Sans</SelectItem>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="arial">Arial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Font Size */}
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Input type="number" defaultValue="24" />
                </div>

                {/* Font Weight */}
                <div className="space-y-2">
                  <Label>Font Weight</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Regular" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300">Light</SelectItem>
                      <SelectItem value="400">Regular</SelectItem>
                      <SelectItem value="500">Medium</SelectItem>
                      <SelectItem value="600">Semibold</SelectItem>
                      <SelectItem value="700">Bold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Text Style */}
                <div className="space-y-2">
                  <Label>Style</Label>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Underline className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Line Height */}
                <div className="space-y-2">
                  <Label>Line Height</Label>
                  <Input type="number" defaultValue="1.5" step="0.1" />
                </div>

                {/* Letter Spacing */}
                <div className="space-y-2">
                  <Label>Letter Spacing</Label>
                  <Input type="number" defaultValue="0" step="0.1" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
