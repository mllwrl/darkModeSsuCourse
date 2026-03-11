const btn = document.getElementById('toggleBtn');
const statusText = document.getElementById('statusText');

chrome.storage.local.get("enabled", (data) => {
    let enabled = data.enabled !== false;
    updateUI(enabled);
});

btn.addEventListener('click', () => {
    chrome.storage.local.get("enabled", (data) => {
        let newState = !(data.enabled !== false);
        chrome.storage.local.set({ enabled: newState }, () => {
            updateUI(newState);
        });
    });
});

function updateUI(enabled) {
    btn.textContent = enabled ? "Выключить" : "Включить";
    btn.className = enabled ? "btn" : "btn off";
    statusText.textContent = enabled ? "Тема активна" : "Тема выключена";
}