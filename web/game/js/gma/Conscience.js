define(['myclass', 'signals', 'gma/Idea', 'gma/Action'], function (my, Signal, Idea, Action) {
    "use strict";

    var Conscience = my.Class({
        constructor: function (god) {
            console.log('Conscience', '::', 'constructor', 'god:', god);

            this.god = null;
            this.denizen = null;
            this.timeout = null;
            this.on = {
                thought: new Signal()
            };

            if (!god) {
                throw new Error('No puede haber Conscience sin god');
            }

            this.god = god;
        },
        think: function () {
            console.log('Conscience', '::', 'think');
            var self = this;

            console.log('CACA', self.caca);

            var time = 500 + Math.round(Math.random() * 10000);

            console.log('>>>>>>>>', time);

            this.timeout = setTimeout(function () {
                var idea = new Idea();

                var actionTeleport = new Action('teleport', [Math.round(Math.random() * 500), Math.round(Math.random() * 500)]);
                var actionMove = new Action('move', [Math.round(Math.random() * 500), Math.round(Math.random() * 500)]);
                var actionWait = new Action('wait', [1000]);

                idea.addItem(actionMove);
                idea.addItem(actionWait);
                //idea.addItem(actionTeleport);
                //idea.addItem(actionWait);

                console.log('Conscience', '::', 'generó la Idea:', idea);
                console.log('GENERO LA IDEA CACA', self.caca);

                self.on.thought.dispatch(idea);

            }, time);
        }
    });

    return Conscience;
})
;