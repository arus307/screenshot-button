'use strict';

//スクリーンショットのボタン設定
let screenshotButton = document.createElement("button");
screenshotButton.className = "screenshotButton";
screenshotButton.title = "スクリーンショットを撮る"
screenshotButton.innerHTML = '<img src="' + chrome.runtime.getURL("icons/icon.svg") + '" style="width:22px;height:22px;transform:translate(11px,7px)">'
screenshotButton.style.cssFloat = "right";
screenshotButton.style.backgroundColor = "transparent";
screenshotButton.style.border = "none";
screenshotButton.style.marginTop = "5px";
screenshotButton.style.marginRight = "5px";
screenshotButton.onclick = CaptureScreenshot;

/**
 * スクリーンショットボタンを追加
 */
function AddScreenshotButton() {
    let ytpRightControls = document.getElementsByClassName("prism-controlbar")[0];
    if (ytpRightControls) {
        ytpRightControls.append(screenshotButton);
    }
}

AddScreenshotButton();

/**
 * キャプチャ実行
 */
function CaptureScreenshot() {
    let player = document.getElementsByTagName("video")[0];

    let canvas = document.createElement("canvas");
    canvas.width = player.videoWidth;
    canvas.height = player.videoHeight;
    canvas.getContext('2d').drawImage(player, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async function (blob) {
        let fileName = getFileName(player);

        let downloadLink = document.createElement("a");
        downloadLink.download = fileName;

        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.click();
    }, 'image/png');

}

/**
 * ファイル名取得
 */
function getFileName(player) {

    let ext = ".png";
    let title = "";

    title += Util.formatTime(player.currentTime);

    return "Z-AN_" + title + " screenshot" + ext;
}