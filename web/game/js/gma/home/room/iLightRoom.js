define(['myclass'], function (my) {
    var iLightRoom = my.Class({
        STATIC: {
            isLightRoom: true
        },
        toggle: function (on) {
            this.lightOn = on;

            if (on) {
                this.light.gotoAndStop('on');
                this.render();
            } else {
                this.light.gotoAndStop('off');
                this.render();
            }
        }
    });

    return iLightRoom;
});
