var ctrl = true;
var alt = true;
var shift = false;
var key = 's';

//判定
var check = function (e) {
    if (ctrl == true && e.ctrlKey == false) {
        return false;
    }

    if (shift == true && e.shiftKey == false) {
        return false;
    }

    if (alt == true && e.altKey == false) {
        return false;
    }

    if (key == e.key.toLowerCase()) {
        return true;
    } else {
        return false;
    }
};

chrome.storage.sync.get(['ctrl', 'alt', 'shift', 'key'], function (result) {
    if('ctrl' in result)ctrl = result.ctrl;
    if('alt' in result) alt = result.alt;
    if('shift' in result) shift = result.shift;
    if('key' in result) key = result.key;
});

document.addEventListener("keydown", (e) => {
    if (check(e) && CaptureScreenshot !== undefined) {
        CaptureScreenshot();
    }
});

