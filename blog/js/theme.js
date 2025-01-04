(function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    // Check for saved preference in localStorage
    if (typeof localStorage.getItem('themeWirtawBlog') !== 'undefined') {
        const currentTheme = localStorage.getItem('themeWirtawBlog');
        if (currentTheme === 'dark-mode') {
            darkModeToggle.checked = true;
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        sunIcon.style.display = currentTheme === 'dark-mode' ? 'block' : 'none';
        moonIcon.style.display = currentTheme === 'dark-mode' ? 'none': 'block';
    } else {
        darkModeToggle.checked = true;
        document.body.classList.add('dark-mode');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        localStorage.setItem('themeWirtawBlog', 'dark-mode');
    }

    // Event listener for the toggle switch

    sunIcon.addEventListener('click', () => {
        darkModeToggle.checked = false;
        document.body.classList.remove('dark-mode');
        localStorage.setItem('themeWirtawBlog', 'light-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    });

    moonIcon.addEventListener('click', () => {
        darkModeToggle.checked = true;
        document.body.classList.add('dark-mode');
        localStorage.setItem('themeWirtawBlog', 'dark-mode');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    });
}());