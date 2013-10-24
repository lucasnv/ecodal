define(['myclass', 'signals'], function (my, signals) {
    return my.Class({
        constructor: function (name) {
            this.name = name;
            this.room = undefined;
            this.owner = undefined;
            this.inProgress = false;
            this.resolved = true;
            this.icon = '';

            this.on = {
                perform: new signals.Signal()
            }
        },

        init: function (room) {
            this.room = room;
        },

        isAvailable: function () {
            return !this.owner && !this.isInProgress();
        },

        isInProgress: function () {
            return this.inProgress;
        },

        isResolved: function () {
            return this.resolved;
        },

        addOwner: function (denizen) {
            this.owner = denizen;
        },

        removeOwner: function () {
            this.owner = undefined;
        },

        perform: function () {
            var d = $.Deferred();

            d.resolve();

            this.on['perform'].dispatch(this);

            return d;
        }

    });
});
