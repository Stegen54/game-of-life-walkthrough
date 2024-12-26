# Game of Life Technical Implementation

## Structure
The implementation consists of three main files:
- `index.html`: The main entry point
- `styles.css`: GitHub-themed styling
- `script.js`: Game logic implementation

## Technical Details

### Grid System
- Uses HTML5 Canvas for rendering
- Cell size: 10px
- Dynamic grid sizing based on viewport
- Toroidal array implementation (edges wrap around)

### Color Scheme
Implements GitHub's contribution graph colors:
- Background: #0d1117
- Level 1 (1 neighbor): #9be9a8
- Level 2 (2 neighbors): #40c463
- Level 3 (3 neighbors): #30a14e
- Level 4 (4+ neighbors): #216e39

### Game Rules
Standard Conway's Game of Life rules:
1. Live cells with 2-3 neighbors survive
2. Dead cells with exactly 3 neighbors become alive
3. All other cells die or remain dead

### Performance Considerations
- Uses requestAnimationFrame for smooth animation
- 500ms delay between generations
- Efficient grid updates using array mapping

### Class Diagram
