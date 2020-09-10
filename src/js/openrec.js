'use strict';

//スクリーンショットのボタン設定
let screenshotButton = document.createElement("button");
screenshotButton.id = "chrome-extension-screenshot-button";
screenshotButton.className = "screenshotButton";
screenshotButton.style.width = "auto";
screenshotButton.innerHTML = '<img src="' + chrome.extension.getURL("icons/icon.svg") + '" style="width:25px;height:25px;">'
screenshotButton.style.cssFloat = "left";
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
    const jsInitCheckTimer = setInterval(jsLoaded, 1000);

    function jsLoaded() {

        //追加済みであれば何もしない
        let isExist = document.getElementById("chrome-extension-screenshot-button");
        if(isExist){
            return;
        }

        //クラス名前方一致
        let CtrlBar = $("[class^='ControlBar__BottomRightBlock']")[0];

        if (CtrlBar) {
            CtrlBar.prepend(screenshotButton);
        }
    };
}

AddScreenshotButton();

/**
 * キャプチャ実行
 */
function CaptureScreenshot() {
    let player = document.getElementById("openrec-video");

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
    let headerEls = $("h1[class^='MovieTitle__Title']");

    if(headerEls.length>0){
        title = headerEls[0].innerText.trim();
    }else{
        title="OPENREC";
    }

    let player = document.getElementById("openrec-video");

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