
var vue = new Vue({
    el: "#app",

    data: {
        ctrl: true,
        alt: true,
        shift: false,
        key: 's',
    },

    mounted: function () {
        var _this = this;
        //ストレージから設定値を復元する
        chrome.storage.sync.get(['ctrl', 'alt', 'shift', 'key'], function (result) {
            if ('ctrl' in result) _this.ctrl = result.ctrl;
            if ('alt' in result) _this.alt = result.alt;
            if ('shift' in result) _this.shift = result.shift;
            if ('key' in result) _this.key = result.key;
        });
    },

    methods: {
        onKeyDown: function (e) {

            //Ctrl/Alt/Shift/Meta(Win)キーは設定させない
            if (e.key == 'Control'
                || e.key == 'Alt'
                || e.key == 'Shift'
                || e.key == 'Meta'
            ) {
                return;
            }

            this.key = e.key.toLowerCase();
        },
        saveOptions: function () {
            chrome.storage.sync.set({
                "ctrl": this.ctrl,
                "shift": this.shift,
                "alt": this.alt,
                "key": this.key,
            });
        },
    },

    computed: {
        shortcut: function () {
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

            return shortcut;
        }

    },

    watch: {
        "ctrl": function (_old, _new) {
            this.saveOptions();
        },
        "alt": function (_old, _new) {
            this.saveOptions();
        },
        "shift": function (_old, _new) {
            this.saveOptions();
        },
        "key": function (_old, _new) {
            this.saveOptions();
        },
    }
});