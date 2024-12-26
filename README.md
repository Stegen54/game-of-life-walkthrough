# GitHub-Style Game of Life

A visual implementation of Conway's Game of Life using GitHub's contribution graph aesthetics. This project demonstrates cellular automata with a familiar and pleasing visual style.

## Overview

This implementation features:
- 🎨 GitHub contribution graph color scheme
- 🖼️ Responsive canvas rendering
- 🎮 Simple start/stop/reset controls
- 🌐 Edge-wrapping grid system

## Getting Started

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Use the controls to:
   - Start/Stop: Toggle simulation
   - Reset: Generate new random pattern

## Live Demo

[View Live Demo](https://your-demo-url-here) *(Add your deployment URL)*

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [walkthrough-README.md](walkthrough-README.md) for technical details.

### Architecture Diagram
### Architecture Diagram

```mermaid
classDiagram
    class GameOfLife {
        -canvas: HTMLCanvasElement
        -ctx: CanvasRenderingContext2D
        -CELL_SIZE: number
        -width: number
        -height: number
        -isRunning: boolean
        +initialize(): void
        +start(): void
        +stop(): void
        +reset(): void
        +handleResize(): void
    }

    class Grid {
        -cells: boolean[][]
        -width: number
        -height: number
        +initialize(width: number, height: number): void
        +getNextGeneration(): boolean[][]
        +countNeighbors(x: number, y: number): number
        +getCellState(x: number, y: number): boolean
    }

    class Renderer {
        -ctx: CanvasRenderingContext2D
        -colorScheme: ColorScheme
        +render(grid: Grid): void
        -drawCell(x: number, y: number, neighbors: number): void
        +clear(): void
    }

    class ColorScheme {
        +readonly COLORS: Record<string, string>
        +getColorByNeighbors(count: number): string
        +getBackgroundColor(): string
    }

    class EventHandler {
        -game: GameOfLife
        +attachListeners(): void
        +detachListeners(): void
        -handleWindowResize(): void
        -handleToggleButton(): void
        -handleResetButton(): void
    }

    GameOfLife --> Grid: manages
    GameOfLife --> Renderer: uses
    GameOfLife --> EventHandler: uses
    Renderer --> ColorScheme: uses
    EventHandler ..> Grid: updates