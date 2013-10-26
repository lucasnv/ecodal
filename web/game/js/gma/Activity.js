define(['myclass', 'signals'], function (my, signals) {
    return my.Class({
        constructor: function (name, config) {
            this.name = name;
            this.room = undefined;
            this.inProgress = false;
            this.resolved = true;
            this.icon = '';
            this.config = config || {};
            this.owner = undefined;

            this.on = {
                perform: new signals.Signal()
            }
        },

        init: function (room) {
            this.room = room;
        },

        isAvailable: function () {
            return !this.isInProgress() && !this.hasOwner() && this.isResolved();
        },

        isInProgress: function () {
            return this.inProgress;
        },

        isResolved: function () {
            return this.resolved;
        },

        isOwner: function (denizen) {
            return this.owner == denizen;
        },

        hasOwner: function () {
            return !!this.owner;
        },

        addOwner: function (denizen) {
            this.owner = denizen;
        },

        removeOwner: function () {
            this.owner = undefined;
        },

        isProblematic: function () {
            return false;
        },

        perform: function (denizen) {
            var d = $.Deferred();
            d.resolve();
            this.on['perform'].dispatch(this);
            this.removeOwner();
            return d;
        }

    });
});
