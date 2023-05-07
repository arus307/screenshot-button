
$("#title").text(chrome.i18n.getMessage('options_page_title'));
$("#msg-shortcut-key").text(chrome.i18n.getMessage('options_page_shortcut_key'));
$("#save-btn").text(chrome.i18n.getMessage('options_save'));

var ctrl = false;
var alt = false;
var shift = false;
var key = 'a';

var currentKey = '';

//ストレージから設定値を復元する
chrome.storage.sync.get(['ctrl', 'alt', 'shift', 'key'], function (result) {
    if ('ctrl' in result) {
        ctrl = result.ctrl;
        $("#input-ctrl").prop('checked', ctrl);
    }
    if ('alt' in result) {
        alt = result.alt;
        $("#input-alt").prop('checked', alt);
    }
    if ('shift' in result) {
        shift = result.shift;
        $("#input-shift").prop('checked', shift);
    }
    if ('key' in result) {
        key = result.key;
        $("#input-key").val(key);
    }

    setCurrentKey(ctrl, alt, shift, key);
});

function setCurrentKey(ctrl, alt, shift, key) {
    // 画面に反映
    let shortcut = '';
    if (this.ctrl) {
        shortcut += 'Ctrl + ';
    }
    if (this.alt) {
        shortcut += 'Alt + ';
    }
    if (this.shift) {
        shortcut += 'Shift + ';
    }
    shortcut += this.key;

    const msgCurrentShortcutSettings = chrome.i18n.getMessage('options_page_current_shortcut_settings', [shortcut]);
    $('#msg-current-shortcut-settings').text(msgCurrentShortcutSettings);
}

function saveSettings() {
    console.log("save settings");

    ctrl = $('#input-ctrl').prop('checked');
    alt = $('#input-alt').prop('checked');
    shift = $('#input-shift').prop('checked');
    key = $('#input-key').val();

    console.log(ctrl);
    console.log(alt);
    console.log(shift);
    console.log(key);

    chrome.storage.sync.set({
        "ctrl": ctrl,
        "shift": shift,
        "alt": alt,
        "key": key,
    }).then(() => {
        console.log("save succeed!");
        setCurrentKey(ctrl, alt, shift, key);
    }).catch(() => {
        console.log("save failed.");
    });
}

$('#save-btn').on('click', saveSettings);