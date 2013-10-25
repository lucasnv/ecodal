define(['myclass', 'gma/Activity'], function (my, Activity) {
    var Faucet = my.Class(Activity, {
        constructor: function (name, config) {
            Faucet.Super.call(this, name, config);

            this.icon = 'icon_faucet';
        },

        init: function (room) {
            Faucet.Super.prototype.init.call(this, room);
        },

        perform: function () {
            var d = $.Deferred();
            if (this.room.faucet) {
                this.room.faucet.getChildAt(0).gotoAndStop(this.resolved ? 'on' : 'off')
            }

            this.resolved = !this.resolved;

            d.resolve();

            this.on['perform'].dispatch(this);
            this.removeOwner();

            return d;
        }
    });

    return Faucet;
});
