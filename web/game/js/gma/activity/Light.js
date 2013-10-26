define(['myclass', 'gma/Activity', 'gma/Resource'], function (my, Activity, Resource) {
    var Light = my.Class(Activity, {
        constructor: function (name, config) {
            Light.Super.call(this, name, config);

            this.icon = 'icon_light';
        },

        init: function (room) {
            Light.Super.prototype.init.call(this, room);
        },

        isAvailable: function () {
            return false;
        },

        perform: function (denizen) {
            var d = $.Deferred();

            if (this.room.light) {
                createjs.Sound.play('snd_light');
                this.room.light.getChildAt(0).gotoAndStop(this.resolved ? 'on' : 'off');
            }

            this.room.gesture(this.resolved ? 'idle' : 'off');

            this.resolved = !this.resolved;

            if (this.isResolved()) {
                Resource.sound.applause.play();
            }

            d.resolve();

            this.on['perform'].dispatch(this);
            this.removeOwner();

            return d;
        }
    });

    return Light;
});
