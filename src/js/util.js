class Util {

    /**
     * 秒をd-h-m-sの形にフォーマットする
     * @param {*} time 経過秒
     */
    static formatTime(time) {

        var seconds = Math.floor(time);

        if (seconds < 60) {
            return seconds + "s";
        }

        var minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;

        if (minutes < 60) {
            return minutes + "m" + Util.paddingZero(seconds, 2) + "s";
        }

        var hours = Math.floor(minutes / 60);
        minutes = minutes % 60;

        if (hours < 24) {
            return hours + "h" + Util.paddingZero(minutes, 2) + "m" + Util.paddingZero(seconds, 2) + "s";
        }

        var days = Math.floor(hours / 24);
        hours = hours % 24;

        return days + "d" + Util.paddingZero(hours, 2) + "h" + Util.paddingZero(minutes, 2) + "m" + Util.paddingZero(seconds, 2) + "s";
    }

    static paddingZero(num, countOfZero) {
        return ('0'.repeat(countOfZero) + num).slice(-countOfZero);
    }


    /**
     * msまでの現在時刻の文字列を返す
     */
    static getNowStr() {
        const now = new Date();

        return now.getFullYear() + Util.paddingZero(now.getMonth() + 1, 2) + Util.paddingZero(now.getDate(), 2)
            + Util.paddingZero(now.getHours(), 2) + Util.paddingZero(now.getMinutes(), 2) + Util.paddingZero(now.getSeconds(), 2)
            + Util.paddingZero(now.getMilliseconds(), 3);
    }

    static getFilePrefix() {
        return "ss_" + this.getNowStr() + "_";
    }
}