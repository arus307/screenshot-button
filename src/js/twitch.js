'use strict';
let style = document.createElement('style');
style.appendChild(document.createTextNode(".screenshotButton:hover{ background-color:hsla(0,0%,100%,.2); }"));
document.getElementsByTagName('head')[0].appendChild(style);

//スクリーンショットのボタン設定
let screenshotButton = document.createElement("button");
screenshotButton.className = "screenshotButton";
screenshotButton.style.width = "3rem";
screenshotButton.style.height = "3rem";
screenshotButton.style.borderRadius = "0.4rem";
screenshotButton.innerHTML = '<img src="' + chrome.runtime.getURL("icons/icon.svg") + '" style="width:2rem;height:2rem;transform:translate(25%,0)">'
screenshotButton.style.cssFloat = "left";
// screenshotButton.onclick = CaptureScreenshot;

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
        let playerRightControlGroups = document.getElementsByClassName("player-controls__right-control-group");
        Array.prototype.forEach.call(playerRightControlGroups, group => {
            let isExist = group.getElementsByClassName("screenshotButton").length != 0;
            if (isExist) {
                //追加済みであれば何もしない
                return;
            }
            let btn = screenshotButton.cloneNode(true);
            btn.onclick = CaptureScreenshot
            group.append(btn);
        })
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
    let headerEls = $("h2[data-a-target='stream-title']");

    if (headerEls.length > 0) {
        title = headerEls[0].innerText.trim();
    } else {
        title = "Twitch";
    }

    let player = document.getElementsByTagName("video")[0];
    title += " " + Util.formatTime(player.currentTime);

    return prefix + title + ext;
}