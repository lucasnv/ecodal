define(['myclass', 'gma/Activity'], function (my, Activity) {
    var Faucet = my.Class(Activity, {
        constructor: function (name, config) {
            Faucet.Super.call(this, name, config);

            this.icon = 'icon_faucet';

            this.sound = {
                faucet: createjs.Sound.createInstance('snd_faucet')
            };
        },

        init: function (room) {
            Faucet.Super.prototype.init.call(this, room);
        },

        perform: function () {
            var d = $.Deferred();
            if (this.room.faucet) {
                this.room.faucet.getChildAt(0).gotoAndStop(this.resolved ? 'on' : 'off')

                if (this.resolved) {
                    this.sound.faucet.play({loop: -1});
                } else {
                    this.sound.faucet.stop();
                }
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
