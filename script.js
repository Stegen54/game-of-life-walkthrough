const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const CELL_SIZE = 10;
const GITHUB_COLORS = {
    level0: '#0d1117', // background
    level1: '#9be9a8',
    level2: '#40c463',
    level3: '#30a14e',
    level4: '#216e39'
};
let width, height;
let grid;
let isRunning = false;
let animationId;


/**
 * @description Get color based on the number of neighbors
 * @param {number} neighbors - Number of neighboring cells
 * @returns {string} Color corresponding to the number of neighbors
 */
function getColor(neighbors) {
    if (neighbors <= 1) return GITHUB_COLORS.level1;
    if (neighbors === 2) return GITHUB_COLORS.level2;
    if (neighbors === 3) return GITHUB_COLORS.level3;
    return GITHUB_COLORS.level4;
}

/**
 * @description Initialize the grid with random values
 */
function initializeGrid() {
    width = Math.floor(window.innerWidth / CELL_SIZE);
    height = Math.floor(window.innerHeight / CELL_SIZE);
    canvas.width = width * CELL_SIZE;
    canvas.height = height * CELL_SIZE;
    
    grid = Array(height).fill().map(() => 
        Array(width).fill().map(() => Math.random() < 0.3)
    );
}

/**
 * @description Draw the grid on the canvas
 */
function drawGrid() {
    ctx.fillStyle = GITHUB_COLORS.level0;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            if(grid[y][x]) {
                const neighbors = getNeighbors(x, y);
                ctx.fillStyle = getColor(neighbors);
                ctx.beginPath();
                ctx.roundRect(
                    x * CELL_SIZE, 
                    y * CELL_SIZE, 
                    CELL_SIZE - 1, 
                    CELL_SIZE - 1,
                    2
                );
                ctx.fill();
            }
        }
    }
}

/**
 * @description Get the number of neighbors for a cell
 * @param {number} x - X coordinate of the cell
 * @param {number} y - Y coordinate of the cell
 * @returns {number} Number of neighboring cells
 */
/**
 * Counts the number of live neighboring cells for a given cell position.
 * Uses toroidal array (wrapping around edges) to check all 8 adjacent cells.
 * 
 * @param {number} x - The x coordinate (column) of the cell
 * @param {number} y - The y coordinate (row) of the cell
 * @returns {number} The count of live neighboring cells (0-8)
 */
function getNeighbors(x, y) {
    let count = 0;
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            if(i === 0 && j === 0) continue;
            const newY = (y + i + height) % height;
            const newX = (x + j + width) % width;
            if(grid[newY][newX]) count++;
        }
    }
    return count;
}

/**
 * @description Update the grid based on the rules of the game
 */
function updateGrid() {
    const newGrid = grid.map(arr => [...arr]);
    
    for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            const neighbors = getNeighbors(x, y);
            if(grid[y][x]) {
                newGrid[y][x] = neighbors === 2 || neighbors === 3;
            } else {
                newGrid[y][x] = neighbors === 3;
            }
        }
    }
    
    grid = newGrid;
}

/**
 * @description Perform a single step of the game
 */
function step() {
    updateGrid();
    drawGrid();
    if(isRunning) {
        setTimeout(() => {
            requestAnimationFrame(step);
        }, 500);
    }
}

/**
 * @description Toggle the running state of the game
 */
function toggle() {
    isRunning = !isRunning;
    if(isRunning) {
        step();
    }
}

/**
 * @description Toggle the visibility of the information panel
 */
function toggleInfo() {
    const infoPanel = document.getElementById('info-panel');
    infoPanel.classList.toggle('hidden');
}

/**
 * @description Reset the game to its initial state
 */
function reset() {
    isRunning = false;
    initializeGrid();
    drawGrid();
}

/**
 * @description Handle window resize event
 */
window.addEventListener('resize', () => {
    initializeGrid();
    drawGrid();
});

// Initialize and draw the grid on page load
initializeGrid();
drawGrid();