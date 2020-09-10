chrome.webNavigation.onHistoryStateUpdated.addListener(function (data) {
  chrome.tabs.get(data.tabId, function (tab) {
    chrome.tabs.executeScript(data.tabId, { code: 'if (typeof AddScreenshotButton !== "undefined") { AddScreenshotButton(); }', runAt: 'document_start' });
  });
}, { url: [{ hostSuffix: '.youtube.com' }] });

chrome.webNavigation.onHistoryStateUpdated.addListener(function (data) {
  chrome.tabs.get(data.tabId, function (tab) {
    chrome.tabs.executeScript(data.tabId, { code: 'if (typeof AddScreenshotButton !== "undefined") { AddScreenshotButton(); }', runAt: 'document_end' });
  });
}, { url: [{ hostSuffix: '.openrec.tv' }] });


chrome.webNavigation.onHistoryStateUpdated.addListener(function (data) {
  chrome.tabs.get(data.tabId, function (tab) {
    chrome.tabs.executeScript(data.tabId, { code: 'if (typeof AddScreenshotButton !== "undefined") { AddScreenshotButton(); }', runAt: 'document_end' });
  });
}, { url: [{ hostSuffix: '.twitch.tv' }] });


chrome.webNavigation.onHistoryStateUpdated.addListener(function (data) {
  chrome.tabs.get(data.tabId, function (tab) {
    chrome.tabs.executeScript(data.tabId, { code: 'if (typeof AddScreenshotButton !== "undefined") { AddScreenshotButton(); }', runAt: 'document_end' });
  });
}, { url: [{ hostSuffix: '.mildom.com' }] });