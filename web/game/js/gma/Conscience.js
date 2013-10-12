define(['myclass', 'signals', 'gma/Idea', 'gma/Action'], function (my, signals, Idea, Action) {
    "use strict";

    var Conscience = my.Class({
        god: null,
        denizen: null,
        timeout: null,
        on: {
            thought: new signals.Signal()
        },
        constructor: function (god) {
            console.log('Conscience', '::', 'constructor', 'god:', god);

            if (!god) {
                throw new Error('No puede haber Conscience sin god');
            }

            this.god = god;
        },
        think: function () {
            console.log('Conscience', '::', 'think');
            var self = this;

            this.timeout = setTimeout(function () {
                var idea = new Idea();

                var actionTeleport = new Action('teleport', [Math.round(Math.random() * 200), Math.round(Math.random() * 200)]);
                var actionWait = new Action('wait', [1000]);

                idea.addItem(actionTeleport);
                idea.addItem(actionWait);

                console.log('Conscience', '::', 'generó la Idea:', idea);
                self.on.thought.dispatch(idea);

            }, 1000);
        }
    });

    return Conscience;
});