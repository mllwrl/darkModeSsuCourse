const buttons = document.querySelectorAll('.theme-btn');


chrome.storage.local.get("theme", (data) => {
    let currentTheme = data.theme || 'dark';
    updateUI(currentTheme);
});


buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let selectedTheme = e.target.getAttribute('data-theme');


        chrome.storage.local.set({ theme: selectedTheme }, () => {
            updateUI(selectedTheme);
        });
    });
});


function updateUI(activeTheme) {
    buttons.forEach(btn => {
        if (btn.getAttribute('data-theme') === activeTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}