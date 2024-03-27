'use strict';

let screenshotButton = document.createElement("button");
screenshotButton.setAttribute('data-testid', "screenshot-button");
screenshotButton.className = "screenshotButton pzp-button pzp-pc-ui-button pzp-pc__setting-button";
screenshotButton.title = "Take screenshot";
screenshotButton.style = "width:36px;height:36px;";
screenshotButton.innerHTML = '<img src=' + chrome.runtime.getURL("icons/icon.svg") + ' style="width:22px;height:22px;">';
screenshotButton.onclick = CaptureScreenshot;


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
    const jsInitCheckTimer = setInterval(jsLoaded, 100);

    function jsLoaded() {
        let controls = document.getElementsByClassName("pzp-pc__bottom-buttons-right")[0];
        let isExist = controls.getElementsByClassName("screenshotButton").length != 0;
        if (isExist) {
            //追加済みであれば何もしない
            return;
        }
        let btn = screenshotButton.cloneNode(true);
        btn.onclick = CaptureScreenshot
        controls.prepend(btn);
    };
}

AddScreenshotButton();

function CaptureScreenshot() {
    let player = document.getElementsByClassName("webplayer-internal-video")[0];
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


function getFileName() {
    const prefix = Util.getFilePrefix();
    const ext = ".png";

    const titleOnDefaultMode = document.querySelector("[class^=video_information_title__]")

    const streamTitle = titleOnDefaultMode != null
        ? titleOnDefaultMode.textContent
        : document.querySelector("[class^=live_information_player_title__]").textContent; // for wide mode

    return prefix + streamTitle + ext;
}