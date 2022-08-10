'use strict';

//スクリーンショットのボタン設定
let screenshotButton = document.querySelector("button.st-activate__button").cloneNode();
screenshotButton.innerHTML = '<a><img src="' + chrome.extension.getURL("icons/icon.svg") + '" style="width:25px;height:25px;"><br>スクショ</a>'
screenshotButton.onclick = CaptureScreenshot;

let ssLi = document.createElement("li");
ssLi.className = "st-activate__item";
ssLi.prepend(screenshotButton);

/**
 * スクリーンショットボタンを追加
 */
function AddScreenshotButton() {
    let footerUl = document.querySelector("ul.st-activate__list");
    if (footerUl) {
        footerUl.prepend(ssLi);
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
    let appendixTitle = "screenshot.png";
    let title;
    let headerEls = document.querySelectorAll("h1.room-name");

    if (headerEls.length > 0) {
        title = headerEls[0].innerText.trim();
    } else {
        title = 'SHOWROOM';
    }

    title += " " + appendixTitle;

    return title;
}