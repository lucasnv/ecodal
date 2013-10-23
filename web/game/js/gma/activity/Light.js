define(['myclass', 'gma/Activity'], function (my, Activity) {
    var Light = my.Class(Activity, {
        constructor: function (name) {
            Light.Super.call(this, name);
        },

        init: function (room) {
            Light.Super.prototype.init.call(this, room);
        },

        isAvailable: function () {
            return false;
        },

        perform: function () {
            var d = $.Deferred();

            this.room.gesture(this.resolved ? 'idle' : 'off');

            this.resolved = !this.resolved;

            d.resolve();

            return d;
        }
    });

    return Light;
});
