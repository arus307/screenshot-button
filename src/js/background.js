//TODO HistoryAPIを利用しての遷移時にスクショボタンを追加するためのコード
// SPWN/ニコ生分を書いていないのでニコ生で生放送ページに戻るボタンで戻ったときにボタンが追加されないかも？

function ignite(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId, allFrames: true },
    func: () => {
      if (typeof AddScreenshotButton !== "undefined") { AddScreenshotButton(); }
    }
  });
}

chrome.webNavigation.onHistoryStateUpdated.addListener(function (data) {
  ignite(data.tabId);
}, {
  url: [
    { hostSuffix: '.youtube.com' },
    { hostSuffix: '.openrec.tv' },
    { hostSuffix: '.twitch.tv' },
    { hostSuffix: '.mildom.com' }
  ]
});
