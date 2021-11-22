'use strict';

//スクリーンショットのボタン設定
let screenshotButton = document.createElement("button");
screenshotButton.className = "screenshotButton vjs-control";
screenshotButton.style.width = "36px";
screenshotButton.innerHTML = '<img src="' + chrome.extension.getURL("icons/icon.svg") + '" style="width:22px;height:22px;">'
screenshotButton.style.cssFloat = "left";
screenshotButton.onclick = CaptureScreenshot;

/**
 * スクリーンショットボタンを追加
 */
function AddScreenshotButton() {

    let spacerElem = document.getElementsByClassName("vjs-custom-control-spacer vjs-spacer")[0];

    
    if (spacerElem) {
        spacerElem.insertAdjacentElement('afterend',screenshotButton);
    }else{
        setTimeout(()=>{AddScreenshotButton()},1000);
    }
}

AddScreenshotButton();

/**
 * キャプチャ実行
 */
function CaptureScreenshot() {
    let players = document.getElementsByTagName("video");
    let player = Array.prototype.filter.call(players,(p)=>p.src !="")[0];

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

    return "SPWN" + title + " screenshot" + ext;
}