define(['myclass', 'signals'], function (my, signals) {
    return my.Class({
        constructor: function (name, room) {
            this.name = name;
            this.room = room;
            this.owner = undefined;
            this.inProgress = false;
            this.on = {
                started: new signals.Signal(),
                resolved: new signals.Signal()
            };
        },

        isAvailable: function () {
            return !this.owner && !this.isInProgress();
        },

        isInProgress: function () {
            return this.inProgress;
        },

        addOwner: function (denizen) {
            this.owner = denizen;
        },

        removeOwner: function () {
            this.owner = undefined;
        },

        perform: function () {
            this.on['started'].dispatch(this);
        },

        resolve: function() {
            this.on['resolved'].dispatch(this);
        }

    });
});
