const tasks = [
    "A day without complaining", "Meditate for 15 minutes", "Organize reading list (blogs, books)", "Offline day",
    "Write down goals for the year", "Spend a day with yourself", "Don't buy anything for 24 hours", "Clean up your social media following",
    "Write down everything you want to do in life", "No phone after 22:00 (read for 1 hour)", "Get rid of clothes you don't wear", "20-minute 'brain dump' on paper",
    "No social media or email until lunch", "Single-tasking: do one thing at a time", "Track and write down your habits", "Thank others, even for small things",
    "Track and write down what irritates you", "Turn off all notifications", "Track how often you say 'yes' to others and why", "Evaluate last 5 big purchases",
    "Write how you see your life in 5 years", "1-hour walk without gadgets", "Time-track every task during the day", "Focus purely on the taste of food",
    "Organize your workspace", "Don't take out your phone during meetings", "Ask yourself: 'Why am I doing this?'", "Tell loved ones how you feel about them",
    "Define your core values and principles", "Think before every word you speak"
];

const grid = document.getElementById('challenge-grid');
const resetBtn = document.getElementById('reset-btn');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

function updateProgress() {
    const total = tasks.length;
    const checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
    const percentage = Math.round((checked / total) * 100);
    progressBar.style.width = percentage + "%";
    progressText.innerText = `${percentage}% Completed (${checked}/${total} Days)`;
}

// Initialize grid
tasks.forEach((task, index) => {
    const card = document.createElement('div');
    card.className = 'task-card';
    const isChecked = localStorage.getItem(`day-${index}`) === 'true';
    if(isChecked) card.classList.add('completed');

    card.innerHTML = `
        <input type="checkbox" id="day-${index}" ${isChecked ? 'checked' : ''}>
        <label for="day-${index}"><strong>Day ${index + 1}:</strong> ${task}</label>
    `;
    grid.appendChild(card);
});

// Initial progress calculation
updateProgress();

// Event Listener for checkboxes
grid.addEventListener('change', (e) => {
    if (e.target.tagName === 'INPUT') {
        const id = e.target.id;
        const checked = e.target.checked;
        localStorage.setItem(id, checked);
        e.target.parentElement.classList.toggle('completed', checked);
        updateProgress();
    }
});

resetBtn.addEventListener('click', () => {
    if(confirm("Are you sure you want to reset all progress?")) {
        localStorage.clear();
        location.reload();
    }
});