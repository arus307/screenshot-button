'use strict';

//スクリーンショットのボタン設定
let screenshotButton = document.createElement("button");
screenshotButton.className = "screenshotButton ytp-button";
screenshotButton.title = "スクリーンショットを撮る"
screenshotButton.innerHTML = '<img src="' + chrome.runtime.getURL("icons/icon.svg") + '" style="width:22px;height:22px;transform:translate(11px,7px)">'
screenshotButton.style.cssFloat = "left";
screenshotButton.onclick = CaptureScreenshot;
screenshotButton.setAttribute('data-testid', 'screenshot-button'); // for testing

/**
 * スクリーンショットボタンを追加
 */
function AddScreenshotButton() {
    let ytpRightControls = document.getElementsByClassName("ytp-right-controls")[0];
    if (ytpRightControls) {
        ytpRightControls.prepend(screenshotButton);
    }
}

AddScreenshotButton();

/**
 * キャプチャ実行
 */
function CaptureScreenshot() {
    let player = document.getElementsByClassName("video-stream")[0];

    let canvas = document.createElement("canvas");
    canvas.width = player.videoWidth;
    canvas.height = player.videoHeight;
    canvas.getContext('2d').drawImage(player, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async function (blob) {
        let fileName = getFileName();

        let downloadLink = document.createElement("a");
        downloadLink.download = fileName;

        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.click();
    }, 'image/png');

}

/**
 * ファイル名取得
 */
function getFileName() {
    const prefix = Util.getFilePrefix();
    const ext = ".png";
    let title;
    let headerEls = document.querySelectorAll("h1.title");

    /**
     * ファイル名を設定
     */
    function SetTitle() {
        if (headerEls.length > 0) {
            title = Array.from(headerEls).map(el => {
                return el.innerText.trim();
            }).join("");
            return true;
        } else {
            return false;
        }
    }

    if (SetTitle() == false) {
        headerEls = document.querySelectorAll("h1.watch-title-container");

        if (SetTitle() == false)
            title = '';
    }
    let player = document.getElementsByClassName("video-stream")[0];

    title += "_" + Util.formatTime(player.currentTime);

    return prefix + title + ext;
}