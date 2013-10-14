define(['myclass', 'signals', 'gma/Idea', 'gma/Action'], function (my, Signal, Idea, Action) {
    "use strict";

    var Conscience = my.Class({
        constructor: function (god) {
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

            var self = this;

            //var time = 500 + Math.round(Math.random() * 500);

            /*
             this.timeout = setTimeout(function () {
             var idea = new Idea();

             var actionTeleport = new Action('teleport', [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]);
             var actionMove = new Action('move', [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]);
             var actionWait = new Action('wait', [1000]);
             var actionAct = new Action('act', [actionTeleport]);

             idea.addItem(actionMove);
             idea.addItem(actionWait);
             //idea.addItem(actionTeleport);
             //idea.addItem(actionWait);

             self.on.thought.dispatch(idea);

             }, time);
             */

            //Dios las posibilidades


            var idea = new Idea();

            var actionTeleport = new Action('teleport', [Math.round(Math.random() * 1000), Math.round(Math.random() * 500)]);
            var actionMove = new Action('move', [Math.round(Math.random() * 1000), Math.round(Math.random() * 500)]);
            var actionWait = new Action('wait', [2000]);
            var actionAct = new Action('act', [actionTeleport]);
            var actionGesture = new Action('gesture', ['action']);

            //idea.addItem(actionMove);
            //idea.addItem(actionWait);
            //idea.addItem(actionTeleport);
            //idea.addItem(actionWait);

            var emptyRoom = this.god.getEmptyRoom(this.denizen);

            if (emptyRoom) {
                idea.addItem(new Action('move', [emptyRoom.body.x + 500, emptyRoom.body.y + 80]));
                idea.addItem(actionGesture);
                idea.addItem(new Action('interact', [emptyRoom, new Action('lights', [!emptyRoom.ligthsOn])]));
                //idea.addItem(actionWait);
            } else {
                idea.addItem(actionWait);
            }

            self.on.thought.dispatch(idea);
        }
    });

    return Conscience;
})
;