'use strict';
let style = document.createElement('style');
style.appendChild(document.createTextNode(".screenshotButton:hover{ background-color:hsla(0,0%,100%,.2); }"));
document.getElementsByTagName('head')[0].appendChild(style);

//スクリーンショットのボタン設定
let screenshotButton = document.createElement("button");
screenshotButton.id = "chrome-extension-screenshot-button";
screenshotButton.className = "screenshotButton";
screenshotButton.style.width = "3rem";
screenshotButton.style.height = "3rem";
screenshotButton.style.borderRadius="0.4rem";
screenshotButton.innerHTML = '<img src="' + chrome.extension.getURL("icons/icon.svg") + '" style="width:2rem;height:2rem;transform:translate(25%,0)">'
screenshotButton.style.cssFloat = "left";
screenshotButton.prepe
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

        //追加済みであれば何もしない
        let isExist = document.getElementById("chrome-extension-screenshot-button");
        if (isExist) {
            return;
        }

        let playerRightControlGroup = document.getElementsByClassName("player-controls__right-control-group")[0];

        if (playerRightControlGroup) {
            playerRightControlGroup.append(screenshotButton);
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
    let headerEls = $("h2[data-a-target='stream-title']");

    if (headerEls.length > 0) {
        title = headerEls[0].innerText.trim();
    } else {
        title = "Twitch";
    }

    let player = document.getElementsByTagName("video")[0];

    let time = player.currentTime;

    title += " ";

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time - (minutes * 60));

    if (minutes > 60) {
        let hours = Math.floor(minutes / 60)
        minutes -= hours * 60;
        title += hours + "-";
    }

    title += minutes + "-" + seconds;

    title += " " + appendixTitle;

    return title;
}