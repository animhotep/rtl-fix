// CSS injected into the page as a USER stylesheet: `!important` here beats the
// site's own rules (even its `!important` ones), and because it is a stylesheet
// rather than inline styles, it also applies to fields the page adds later.
const RTL_CSS = `
textarea,
input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="color"]):not([type="file"]):not([type="image"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="hidden"]),
[contenteditable]:not([contenteditable="false"]),
[contenteditable]:not([contenteditable="false"]) *,
[role="textbox"],
[role="textbox"] * {
    direction: rtl !important;
    text-align: right !important;
}
`;

function showStatus(text, isError = false) {
    const el = document.getElementById('status');
    el.textContent = text;
    el.classList.toggle('error', isError);
}

async function getActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || tab.id === undefined) throw new Error('No active tab');
    return tab;
}

async function makeRTL() {
    try {
        const tab = await getActiveTab();
        await chrome.scripting.insertCSS({
            target: { tabId: tab.id, allFrames: true },
            css: RTL_CSS,
            origin: 'USER',
        });
        showStatus('RTL enabled');
    } catch (e) {
        showStatus(`Can't run on this page: ${e.message}`, true);
    }
}

async function resetRTL() {
    try {
        const tab = await getActiveTab();
        await chrome.scripting.removeCSS({
            target: { tabId: tab.id, allFrames: true },
            css: RTL_CSS,
            origin: 'USER',
        });
        showStatus('RTL disabled');
    } catch (e) {
        showStatus(`Can't run on this page: ${e.message}`, true);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('makeRTL').addEventListener('click', makeRTL);
    document.getElementById('resetRTL').addEventListener('click', resetRTL);
});
