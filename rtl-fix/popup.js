document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('makeRTL').addEventListener('click', e => {
        makeRTL();
    }, false);
});
function getTitle() {
    document.body.style.backgroundColor = 'red';
    let t = document.querySelectorAll("textarea");
    let i = document.querySelectorAll("input");
    t.forEach(el=>{
        el.style['text-align'] = 'right';
        el.style['direction'] = 'rtl';
    });  
    i.forEach(el=>{
        el.style['text-align'] = 'right';
        el.style['direction'] = 'rtl';
    })
}
function makeRTL() {
    

    let queryOptions = { active: true, currentWindow: true };
    chrome.tabs.query(queryOptions, ([tab]) => {
        if (chrome.runtime.lastError) alert(chrome.runtime.lastError);
        console.log(tab);
        chrome.scripting.executeScript({ // Run the following script on our tab
            target: {tabId: tab.id},
            func : getTitle,
        })
    });
}