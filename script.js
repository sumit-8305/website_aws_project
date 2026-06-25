// Initialize counter and tracking variables
let counter = 0;
let totalClicks = 0;
let lastAction = 'None';

// DOM Elements
const counterDisplay = document.getElementById('counterDisplay');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
const resetBtn = document.getElementById('resetBtn');
const saveBtn = document.getElementById('saveBtn');
const totalClicksSpan = document.getElementById('totalClicks');
const lastActionSpan = document.getElementById('lastAction');
const statusMessage = document.getElementById('statusMessage');

// Load data from localStorage on page load
function loadData() {
    const savedData = localStorage.getItem('counterData');
    if (savedData) {
        const data = JSON.parse(savedData);
        counter = data.counter;
        totalClicks = data.totalClicks;
        lastAction = data.lastAction;
        updateDisplay();
    }
}

// Update the display
function updateDisplay() {
    counterDisplay.textContent = counter;
    totalClicksSpan.textContent = totalClicks;
    lastActionSpan.textContent = lastAction;
    
    // Add pulse animation
    counterDisplay.style.animation = 'none';
    setTimeout(() => {
        counterDisplay.style.animation = 'pulse 0.3s ease-out';
    }, 10);
}

// Increase counter
function increase() {
    counter++;
    totalClicks++;
    lastAction = 'Increased at ' + new Date().toLocaleTimeString();
    updateDisplay();
    showStatus('Counter increased! ✅');
}

// Decrease counter
function decrease() {
    counter--;
    totalClicks++;
    lastAction = 'Decreased at ' + new Date().toLocaleTimeString();
    updateDisplay();
    showStatus('Counter decreased! ✅');
}

// Reset counter
function reset() {
    counter = 0;
    totalClicks++;
    lastAction = 'Reset at ' + new Date().toLocaleTimeString();
    updateDisplay();
    showStatus('Counter reset! 🔄');
}

// Save data to localStorage
function saveData() {
    const data = {
        counter: counter,
        totalClicks: totalClicks,
        lastAction: lastAction,
        savedAt: new Date().toLocaleString()
    };
    
    localStorage.setItem('counterData', JSON.stringify(data));
    showStatus('Data saved successfully! 💾 Saved at: ' + data.savedAt);
}

// Show status message
function showStatus(message) {
    statusMessage.textContent = message;
    statusMessage.style.opacity = '1';
    
    setTimeout(() => {
        statusMessage.style.opacity = '0.5';
    }, 2000);
}

// Event listeners
increaseBtn.addEventListener('click', increase);
decreaseBtn.addEventListener('click', decrease);
resetBtn.addEventListener('click', reset);
saveBtn.addEventListener('click', saveData);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '+' || e.key === '=') increase();
    if (e.key === '-') decrease();
    if (e.key === 'r' || e.key === 'R') reset();
    if (e.key === 's' || e.key === 'S') saveData();
});

// Load data when page loads
window.addEventListener('load', loadData);

console.log('Counter app initialized! Use keyboard shortcuts: + to increase, - to decrease, R to reset, S to save');
