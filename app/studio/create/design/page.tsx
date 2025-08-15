"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Download,
  Share2,
  Settings,
  Eye,
  Square,
  Circle,
  Type,
  ImageIcon,
  Pen,
  Hand,
  MousePointer,
  Copy,
  Trash2,
  Grid3X3,
  Ruler,
  ChevronLeft,
  ChevronRight,
  GripVertical,
} from "lucide-react"
import Link from "next/link"
import { LayersPanel } from "@/components/layers-panel"
import { PropertiesPanel } from "@/components/properties-panel"

interface DesignElement {
  id: string
  type: "rectangle" | "circle" | "text" | "image"
  x: number
  y: number
  width: number
  height: number
  rotation: number
  visible: boolean
  locked: boolean
  properties: {
    fill?: string
    stroke?: string
    strokeWidth?: number
    text?: string
    fontSize?: number
    fontFamily?: string
    opacity?: number
  }
}

interface HistoryState {
  elements: DesignElement[]
  selectedElements: string[]
}

export default function DesignPage() {
  const [selectedTool, setSelectedTool] = useState("select")
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [elements, setElements] = useState<DesignElement[]>([
    {
      id: "rect1",
      type: "rectangle",
      x: 100,
      y: 200,
      width: 144,
      height: 144,
      rotation: 0,
      visible: true,
      locked: false,
      properties: { fill: "#3b82f6", opacity: 0.9 },
    },
    {
      id: "circle1",
      type: "circle",
      x: 300,
      y: 250,
      width: 112,
      height: 112,
      rotation: 0,
      visible: true,
      locked: false,
      properties: { fill: "#06b6d4", opacity: 0.9 },
    },
    {
      id: "text1",
      type: "text",
      x: 450,
      y: 300,
      width: 200,
      height: 60,
      rotation: 0,
      visible: true,
      locked: false,
      properties: { text: "Sample Text", fontSize: 24, fontFamily: "Inter" },
    },
  ])

  const [zoomLevel, setZoomLevel] = useState(100)
  const [showGrid, setShowGrid] = useState(true)
  const [showRulers, setShowRulers] = useState(true)
  const [showGuides, setShowGuides] = useState(true)
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [selectionBox, setSelectionBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null)

  const [leftPanelWidth, setLeftPanelWidth] = useState(288)
  const [rightPanelWidth, setRightPanelWidth] = useState(320)
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const [isResizingLeft, setIsResizingLeft] = useState(false)
  const [isResizingRight, setIsResizingRight] = useState(false)

  const [history, setHistory] = useState<HistoryState[]>([{ elements, selectedElements }])
  const [historyIndex, setHistoryIndex] = useState(0)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case "z":
            e.preventDefault()
            if (e.shiftKey) {
              redo()
            } else {
              undo()
            }
            break
          case "c":
            e.preventDefault()
            copyElements()
            break
          case "v":
            e.preventDefault()
            pasteElements()
            break
          case "a":
            e.preventDefault()
            selectAll()
            break
          case "d":
            e.preventDefault()
            duplicateElements()
            break
          case "=":
          case "+":
            e.preventDefault()
            setZoomLevel((prev) => Math.min(400, prev + 25))
            break
          case "-":
            e.preventDefault()
            setZoomLevel((prev) => Math.max(25, prev - 25))
            break
          case "0":
            e.preventDefault()
            setZoomLevel(100)
            break
        }
      }

      // Tool shortcuts
      switch (e.key) {
        case "v":
          setSelectedTool("select")
          break
        case "r":
          setSelectedTool("rectangle")
          break
        case "o":
          setSelectedTool("circle")
          break
        case "t":
          setSelectedTool("text")
          break
        case "h":
          setSelectedTool("hand")
          break
        case "Delete":
        case "Backspace":
          deleteSelectedElements()
          break
        case "Escape":
          setSelectedElements([])
          setSelectionBox(null)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedElements, elements, historyIndex])

  const saveToHistory = useCallback(() => {
    const newState = { elements, selectedElements }
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newState)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [elements, selectedElements, history, historyIndex])

  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1]
      setElements(prevState.elements)
      setSelectedElements(prevState.selectedElements)
      setHistoryIndex(historyIndex - 1)
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1]
      setElements(nextState.elements)
      setSelectedElements(nextState.selectedElements)
      setHistoryIndex(historyIndex + 1)
    }
  }

  const selectAll = () => {
    setSelectedElements(elements.map((el) => el.id))
  }

  const copyElements = () => {
    const selectedEls = elements.filter((el) => selectedElements.includes(el.id))
    localStorage.setItem("copiedElements", JSON.stringify(selectedEls))
  }

  const pasteElements = () => {
    const copiedData = localStorage.getItem("copiedElements")
    if (copiedData) {
      const copiedElements = JSON.parse(copiedData) as DesignElement[]
      const newElements = copiedElements.map((el) => ({
        ...el,
        id: `${el.type}_${Date.now()}_${Math.random()}`,
        x: el.x + 20,
        y: el.y + 20,
      }))
      setElements((prev) => [...prev, ...newElements])
      setSelectedElements(newElements.map((el) => el.id))
      saveToHistory()
    }
  }

  const duplicateElements = () => {
    copyElements()
    pasteElements()
  }

  const deleteSelectedElements = () => {
    setElements((prev) => prev.filter((el) => !selectedElements.includes(el.id)))
    setSelectedElements([])
    saveToHistory()
  }

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = (e.clientX - rect.left - canvasOffset.x) * (100 / zoomLevel)
    const y = (e.clientY - rect.top - canvasOffset.y) * (100 / zoomLevel)

    if (selectedTool === "select") {
      setSelectionBox({ x, y, width: 0, height: 0 })
      setIsDragging(true)
      setDragStart({ x, y })
    } else if (selectedTool === "rectangle" || selectedTool === "circle") {
      const newElement: DesignElement = {
        id: `${selectedTool}_${Date.now()}`,
        type: selectedTool as "rectangle" | "circle",
        x,
        y,
        width: 0,
        height: 0,
        rotation: 0,
        visible: true,
        locked: false,
        properties: { fill: selectedTool === "rectangle" ? "#3b82f6" : "#06b6d4", opacity: 0.9 },
      }
      setElements((prev) => [...prev, newElement])
      setSelectedElements([newElement.id])
      setIsDragging(true)
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - canvasOffset.x) * (100 / zoomLevel)
    const y = (e.clientY - rect.top - canvasOffset.y) * (100 / zoomLevel)

    if (selectedTool === "select" && selectionBox) {
      setSelectionBox({
        x: Math.min(dragStart.x, x),
        y: Math.min(dragStart.y, y),
        width: Math.abs(x - dragStart.x),
        height: Math.abs(y - dragStart.y),
      })
    } else if (selectedElements.length === 1 && (selectedTool === "rectangle" || selectedTool === "circle")) {
      const elementId = selectedElements[0]
      setElements((prev) =>
        prev.map((el) => (el.id === elementId ? { ...el, width: Math.abs(x - el.x), height: Math.abs(y - el.y) } : el)),
      )
    }
  }

  const handleCanvasMouseUp = () => {
    if (selectionBox && selectedTool === "select") {
      const selectedIds = elements
        .filter(
          (el) =>
            el.x >= selectionBox.x &&
            el.y >= selectionBox.y &&
            el.x + el.width <= selectionBox.x + selectionBox.width &&
            el.y + el.height <= selectionBox.y + selectionBox.height,
        )
        .map((el) => el.id)

      setSelectedElements(selectedIds)
      setSelectionBox(null)
    }

    setIsDragging(false)
    if (selectedTool !== "select") {
      saveToHistory()
    }
  }

  const handleElementClick = (elementId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (e.metaKey || e.ctrlKey) {
      setSelectedElements((prev) =>
        prev.includes(elementId) ? prev.filter((id) => id !== elementId) : [...prev, elementId],
      )
    } else {
      setSelectedElements([elementId])
    }
  }

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(400, prev + 25))
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(25, prev - 25))
  const handleZoomReset = () => setZoomLevel(100)
  const handleZoomFit = () => {
    // Calculate zoom to fit all elements
    if (elements.length === 0) return
    const bounds = elements.reduce(
      (acc, el) => ({
        minX: Math.min(acc.minX, el.x),
        minY: Math.min(acc.minY, el.y),
        maxX: Math.max(acc.maxX, el.x + el.width),
        maxY: Math.max(acc.maxY, el.y + el.height),
      }),
      {
        minX: Number.POSITIVE_INFINITY,
        minY: Number.POSITIVE_INFINITY,
        maxX: Number.NEGATIVE_INFINITY,
        maxY: Number.NEGATIVE_INFINITY,
      },
    )

    const padding = 100
    const availableWidth = window.innerWidth - 400 // Account for sidebars
    const availableHeight = window.innerHeight - 200 // Account for header
    const contentWidth = bounds.maxX - bounds.minX + padding * 2
    const contentHeight = bounds.maxY - bounds.minY + padding * 2

    const zoomX = (availableWidth / contentWidth) * 100
    const zoomY = (availableHeight / contentHeight) * 100
    const newZoom = Math.min(zoomX, zoomY, 100)

    setZoomLevel(Math.max(25, newZoom))
  }

  const toggleElementVisibility = (elementId: string) => {
    setElements((prev) => prev.map((el) => (el.id === elementId ? { ...el, visible: !el.visible } : el)))
    saveToHistory()
  }

  const toggleElementLock = (elementId: string) => {
    setElements((prev) => prev.map((el) => (el.id === elementId ? { ...el, locked: !el.locked } : el)))
    saveToHistory()
  }

  const handleLeftResize = useCallback(
    (e: MouseEvent) => {
      if (!isResizingLeft) return
      const newWidth = Math.max(200, Math.min(500, e.clientX - 72)) // 72px for tool sidebar
      setLeftPanelWidth(newWidth)
    },
    [isResizingLeft],
  )

  const handleRightResize = useCallback(
    (e: MouseEvent) => {
      if (!isResizingRight) return
      const newWidth = Math.max(250, Math.min(500, window.innerWidth - e.clientX))
      setRightPanelWidth(newWidth)
    },
    [isResizingRight],
  )

  useEffect(() => {
    if (isResizingLeft || isResizingRight) {
      const handleMouseMove = (e: MouseEvent) => {
        handleLeftResize(e)
        handleRightResize(e)
      }
      const handleMouseUp = () => {
        setIsResizingLeft(false)
        setIsResizingRight(false)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isResizingLeft, isResizingRight, handleLeftResize, handleRightResize])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ... existing header code ... */}
      <header className="border-b border-border/50 bg-background/80 apple-blur sticky top-0 z-50">
        <div className="container mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/studio">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Studio
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold tracking-tight">Design Editor</h1>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="text-xs font-medium px-2 py-1">
                      <Eye className="w-3 h-3 mr-1.5" />
                      Draft
                    </Badge>
                    <span>Auto-saved 1 minute ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleZoomOut}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Input
                  value={`${zoomLevel}%`}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value.replace("%", ""))
                    if (!isNaN(value) && value >= 25 && value <= 400) {
                      setZoomLevel(value)
                    }
                  }}
                  className="w-16 h-8 text-center text-sm border-0 bg-transparent"
                />
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleZoomIn}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-4 mx-1" />
                <Button variant="ghost" size="sm" className="h-9 px-2 text-xs" onClick={handleZoomFit}>
                  Fit
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0" onClick={undo} disabled={historyIndex <= 0}>
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                >
                  <Redo className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex pt-6">
        {/* Tool Sidebar */}
        <div className="w-18 border-r border-border/50 bg-sidebar/50 apple-blur flex flex-col items-center py-6 gap-2">
          {/* ... existing tool buttons ... */}
          <div className="flex flex-col gap-1">
            <Button
              variant={selectedTool === "select" ? "default" : "ghost"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => setSelectedTool("select")}
              title="Select (V)"
            >
              <MousePointer className="w-4 h-4" />
            </Button>
            <Button
              variant={selectedTool === "hand" ? "default" : "ghost"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => setSelectedTool("hand")}
              title="Hand (H)"
            >
              <Hand className="w-4 h-4" />
            </Button>
            <Separator className="my-2" />
            <Button
              variant={selectedTool === "rectangle" ? "default" : "ghost"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => setSelectedTool("rectangle")}
              title="Rectangle (R)"
            >
              <Square className="w-4 h-4" />
            </Button>
            <Button
              variant={selectedTool === "circle" ? "default" : "ghost"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => setSelectedTool("circle")}
              title="Circle (O)"
            >
              <Circle className="w-4 h-4" />
            </Button>
            <Button
              variant={selectedTool === "text" ? "default" : "ghost"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => setSelectedTool("text")}
              title="Text (T)"
            >
              <Type className="w-4 h-4" />
            </Button>
            <Button
              variant={selectedTool === "pen" ? "default" : "ghost"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => setSelectedTool("pen")}
              title="Pen Tool"
            >
              <Pen className="w-4 h-4" />
            </Button>
            <Button
              variant={selectedTool === "image" ? "default" : "ghost"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => setSelectedTool("image")}
              title="Image"
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Left Panel - Layers */}
        <div
          className={`${leftPanelCollapsed ? "w-12" : ""} border-r border-border/50 bg-sidebar/30 apple-blur relative transition-all duration-300`}
          style={{ width: leftPanelCollapsed ? "48px" : `${leftPanelWidth}px` }}
        >
          {!leftPanelCollapsed && (
            <LayersPanel
              selectedElement={selectedElements[0] || null}
              onElementSelect={(id) => setSelectedElements(id ? [id] : [])}
              elements={elements}
              onToggleVisibility={toggleElementVisibility}
              onToggleLock={toggleElementLock}
            />
          )}

          {/* Collapse/Expand Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-2 w-8 h-8 p-0 z-10"
            onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
          >
            {leftPanelCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>

          {/* Resize Handle */}
          {!leftPanelCollapsed && (
            <div
              className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/20 transition-colors"
              onMouseDown={() => setIsResizingLeft(true)}
            >
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-3 h-8 flex items-center justify-center">
                <GripVertical className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* ... existing canvas toolbar ... */}
          <div className="border-b border-border/50 bg-sidebar/30 apple-blur px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  variant={showGrid ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 text-sm font-medium"
                  onClick={() => setShowGrid(!showGrid)}
                >
                  <Grid3X3 className="w-4 h-4 mr-1.5" />
                  Grid
                </Button>
                <Button
                  variant={showRulers ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 text-sm font-medium"
                  onClick={() => setShowRulers(!showRulers)}
                >
                  <Ruler className="w-4 h-4 mr-1.5" />
                  Rulers
                </Button>
                <Button
                  variant={showGuides ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 text-sm font-medium"
                  onClick={() => setShowGuides(!showGuides)}
                >
                  Guides
                </Button>
                <Separator orientation="vertical" className="h-4 mx-2" />
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Align Left">
                  <AlignLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Align Center">
                  <AlignCenter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Align Right">
                  <AlignRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Justify">
                  <AlignJustify className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-4 mx-2" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={duplicateElements}
                  disabled={selectedElements.length === 0}
                  title="Duplicate (Cmd+D)"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={deleteSelectedElements}
                  disabled={selectedElements.length === 0}
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground font-medium">
                  Canvas: 1920 × 1080 | Selected: {selectedElements.length}
                </span>
              </div>
            </div>
          </div>

          {/* Canvas Content */}
          <div className="flex-1 bg-muted/30 relative overflow-hidden">
            {/* ... existing rulers and canvas code ... */}
            {showRulers && (
              <>
                <div className="absolute top-0 left-0 right-0 h-5 bg-sidebar/80 apple-blur border-b border-border/50 flex items-center text-xs text-muted-foreground font-medium">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="flex-1 border-r border-border/30 text-center py-1">
                      {i * 100}
                    </div>
                  ))}
                </div>
                <div className="absolute top-5 left-0 bottom-0 w-5 bg-sidebar/80 apple-blur border-r border-border/50 flex flex-col items-center text-xs text-muted-foreground font-medium">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="flex-1 border-b border-border/30 flex items-center justify-center">
                      {i * 100}
                    </div>
                  ))}
                </div>
              </>
            )}

            <div
              ref={canvasRef}
              className={`absolute ${showRulers ? "top-5 left-5" : "top-0 left-0"} right-0 bottom-0 flex items-center justify-center p-8 cursor-${selectedTool === "hand" ? "grab" : selectedTool === "select" ? "default" : "crosshair"}`}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
            >
              <div
                className="bg-white apple-shadow-lg relative rounded-lg overflow-hidden"
                style={{
                  width: `${(1920 * zoomLevel) / 100}px`,
                  height: `${(1080 * zoomLevel) / 100}px`,
                  transform: `scale(${Math.min(1, zoomLevel / 100)})`,
                }}
              >
                {/* ... existing canvas content ... */}
                {showGrid && (
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, #6b7280 1px, transparent 1px),
                        linear-gradient(to bottom, #6b7280 1px, transparent 1px)
                      `,
                      backgroundSize: "24px 24px",
                    }}
                  />
                )}

                <div className="absolute inset-0 p-12">
                  {elements
                    .filter((el) => el.visible)
                    .map((element) => (
                      <div
                        key={element.id}
                        className={`absolute cursor-pointer border-2 transition-all duration-200 apple-shadow ${
                          selectedElements.includes(element.id)
                            ? "border-primary scale-105 z-10"
                            : "border-transparent hover:scale-102"
                        } ${element.locked ? "cursor-not-allowed" : ""}`}
                        style={{
                          left: `${element.x}px`,
                          top: `${element.y}px`,
                          width: `${element.width}px`,
                          height: `${element.height}px`,
                          transform: `rotate(${element.rotation}deg)`,
                          backgroundColor: element.properties.fill,
                          opacity: element.properties.opacity || 1,
                          borderRadius: element.type === "circle" ? "50%" : element.type === "text" ? "12px" : "16px",
                        }}
                        onClick={(e) => !element.locked && handleElementClick(element.id, e)}
                      >
                        {element.type === "text" && (
                          <div
                            className="p-4 bg-white/80 apple-blur rounded-xl h-full flex items-center justify-center"
                            style={{
                              fontSize: `${element.properties.fontSize || 24}px`,
                              fontFamily: element.properties.fontFamily || "Inter",
                            }}
                          >
                            <span className="text-foreground font-semibold tracking-tight">
                              {element.properties.text || "Sample Text"}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {/* ... existing selection handles and selection box ... */}
                {selectedElements.length === 1 && (
                  <div className="absolute inset-0">
                    {(() => {
                      const element = elements.find((el) => el.id === selectedElements[0])
                      if (!element || element.locked) return null

                      const handles = [
                        { x: element.x - 6, y: element.y - 6, cursor: "nw-resize" },
                        { x: element.x + element.width - 6, y: element.y - 6, cursor: "ne-resize" },
                        { x: element.x + element.width - 6, y: element.y + element.height - 6, cursor: "se-resize" },
                        { x: element.x - 6, y: element.y + element.height - 6, cursor: "sw-resize" },
                        { x: element.x + element.width / 2 - 6, y: element.y - 6, cursor: "n-resize" },
                        { x: element.x + element.width - 6, y: element.y + element.height / 2 - 6, cursor: "e-resize" },
                        { x: element.x + element.width / 2 - 6, y: element.y + element.height - 6, cursor: "s-resize" },
                        { x: element.x - 6, y: element.y + element.height / 2 - 6, cursor: "w-resize" },
                      ]

                      return handles.map((handle, index) => (
                        <div
                          key={index}
                          className="absolute w-3 h-3 bg-primary rounded-full border-2 border-white apple-shadow hover:scale-125 transition-transform"
                          style={{
                            left: `${handle.x}px`,
                            top: `${handle.y}px`,
                            cursor: handle.cursor,
                          }}
                        />
                      ))
                    })()}
                  </div>
                )}

                {selectionBox && (
                  <div
                    className="absolute border-2 border-primary bg-primary/10 rounded"
                    style={{
                      left: `${selectionBox.x}px`,
                      top: `${selectionBox.y}px`,
                      width: `${selectionBox.width}px`,
                      height: `${selectionBox.height}px`,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div
          className={`${rightPanelCollapsed ? "w-12" : ""} border-l border-border/50 bg-sidebar/30 apple-blur relative transition-all duration-300`}
          style={{ width: rightPanelCollapsed ? "48px" : `${rightPanelWidth}px` }}
        >
          {!rightPanelCollapsed && (
            <PropertiesPanel
              selectedElement={selectedElements[0] || null}
              elements={elements}
              onUpdateElement={(id, updates) => {
                setElements((prev) => prev.map((el) => (el.id === id ? { ...el, ...updates } : el)))
                saveToHistory()
              }}
            />
          )}

          {/* Collapse/Expand Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 left-2 w-8 h-8 p-0 z-10"
            onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
          >
            {rightPanelCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>

          {/* Resize Handle */}
          {!rightPanelCollapsed && (
            <div
              className="absolute top-0 left-0 w-1 h-full cursor-col-resize hover:bg-primary/20 transition-colors"
              onMouseDown={() => setIsResizingRight(true)}
            >
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-3 h-8 flex items-center justify-center">
                <GripVertical className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
