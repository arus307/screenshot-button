class Util{

    /**
     * 秒をd-h-m-sの形にフォーマットする
     * @param {*} time 経過秒
     */
    static formatTime(time){

        var seconds = Math.floor(time);

        if(seconds<60){
            return seconds + "s";
        }

        var minutes = Math.floor(seconds/60);
        seconds = seconds%60;

        if(minutes < 60){
            return minutes + "m" + Util.paddingTwoZero(seconds) + "s";
        }

        var hours = Math.floor(minutes/60);
        minutes = minutes%60;

        if(hours < 24){
            return hours + "h" + Util.paddingTwoZero(minutes) + "m" + Util.paddingTwoZero(seconds) + "s";
        }

        var days = Math.floor(hours/24);
        hours = hours%24;

        return days + "d" + Util.paddingTwoZero(hours) + "h" + Util.paddingTwoZero(minutes) + "m" + Util.paddingTwoZero(seconds) + "s";
    }

    static paddingTwoZero(num){
        return ( '00' + num ).slice( -2 );
    }

}