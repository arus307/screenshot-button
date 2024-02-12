'use strict';

//スクリーンショットのボタン設定
let screenshotButton = document.createElement("button");
screenshotButton.id = "chrome-extension-screenshot-button";
screenshotButton.className = "screenshotButton ccoLTU";
screenshotButton.style.width = "auto";
screenshotButton.style.marginRight = "32px"
screenshotButton.innerHTML = '<img src="' + chrome.runtime.getURL("icons/icon.svg") + '" style="width:25px;height:25px;transform:translate(0,2px)">'
screenshotButton.style.cssFloat = "left";


/**
 * スクリーンショットボタンを追加
 */
function AddScreenshotButton() {
    window.addEventListener("load", main, false);
}

/**
 * CMでプレイヤーの更新が走るので定期的に 存在チェック→なければ追加 を繰り返す
 */
function main(e) {
    const jsInitCheckTimer = setInterval(jsLoaded, 1000);

    function jsLoaded() {

        //追加済みであれば何もしない
        let isExist = document.getElementById("chrome-extension-screenshot-button");
        if (isExist) {
            return;
        }

        //ライブ
        let videoRightControls = document.getElementsByClassName("layout-right")[0];
        if (videoRightControls) {
            screenshotButton.onclick = CaptureScreenshot;
            videoRightControls.prepend(screenshotButton);
        }

        //アーカイブ
        let vodControlBar = document.getElementsByClassName("vod-controller-bar")[0];
        if (vodControlBar) {
            screenshotButton.onclick = CaptureScreenshot;
            vodControlBar.append(screenshotButton);
        }
    };
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
    const prefix = Util.getFilePrefix();
    const ext = ".png";
    let title;

    let headerEl = document.querySelectorAll("div .room-anchor-panel__anchor-intro")[0];

    if (headerEl) {
        title = headerEl.getAttribute("title").toString().trim();
    } else {
        headerEl = document.querySelector("div .title");
        if (headerEl) {
            title = headerEl.getAttribute("title").toString().trim();
        } else {
            title = 'Mildom';
        }
    }

    title += "_" + Util.formatTime(player.currentTime);

    return prefix + title + ext;
}