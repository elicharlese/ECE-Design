"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

const presetColors = [
  "#0891b2", // Primary cyan
  "#f97316", // Secondary orange
  "#dc2626", // Red
  "#16a34a", // Green
  "#7c3aed", // Purple
  "#db2777", // Pink
  "#000000", // Black
  "#ffffff", // White
  "#6b7280", // Gray
  "#fbbf24", // Yellow
]

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start gap-2 h-10 bg-transparent">
          <div className="w-6 h-6 rounded border border-border" style={{ backgroundColor: color }} />
          <span className="font-mono text-sm">{color}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="start">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Color</Label>
            <Input type="color" value={color} onChange={(e) => onChange(e.target.value)} className="w-full h-10 mt-2" />
          </div>

          <div>
            <Label className="text-sm font-medium">Hex Value</Label>
            <Input
              type="text"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="font-mono mt-2"
              placeholder="#000000"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Presets</Label>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {presetColors.map((presetColor) => (
                <Button
                  key={presetColor}
                  variant="outline"
                  className="w-10 h-10 p-0 border-2 bg-transparent"
                  style={{
                    backgroundColor: presetColor,
                    borderColor: color === presetColor ? "#0891b2" : "transparent",
                  }}
                  onClick={() => {
                    onChange(presetColor)
                    setIsOpen(false)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
