function applyTheme(enabled) {
    let styleLink = document.getElementById('ssu-dark-style');

    const shouldBeEnabled = (enabled !== false);

    if (shouldBeEnabled) {
        if (!styleLink) {
            styleLink = document.createElement('link');
            styleLink.id = 'ssu-dark-style';
            styleLink.rel = 'stylesheet';
            styleLink.href = chrome.runtime.getURL('style.css');
            (document.head || document.documentElement).appendChild(styleLink);
        }
    } else {
        if (styleLink) {
            styleLink.remove();
        }
    }
}

chrome.storage.local.get("enabled", (data) => {
    applyTheme(data.enabled);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.enabled) {
        applyTheme(changes.enabled.newValue);
    }
});