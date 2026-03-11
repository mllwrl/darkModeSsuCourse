function applyTheme(themeName) {

    let existingStyle = document.getElementById('ssu-custom-theme');


    if (!themeName || themeName === 'none') {
        if (existingStyle) existingStyle.remove();
        return;
    }


    let cssUrl = chrome.runtime.getURL(themeName + '.css');

    if (existingStyle) {
        if (existingStyle.href !== cssUrl) {
            existingStyle.href = cssUrl;
        }
    } else {

        let styleLink = document.createElement('link');
        styleLink.id = 'ssu-custom-theme';
        styleLink.rel = 'stylesheet';
        styleLink.href = cssUrl;
        (document.head || document.documentElement).appendChild(styleLink);
    }
}


chrome.storage.local.get("theme", (data) => {
    applyTheme(data.theme || 'dark');
});


chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.theme) {
        applyTheme(changes.theme.newValue);
    }
});