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

            console.log('Conscience', '::', 'think');

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
            var actionWait = new Action('wait', [1000]);
            var actionAct = new Action('act', [actionTeleport]);
            var actionGesture = new Action('gesture', ['action']);
            var actionWalk = new Action('gesture', ['walk']);

            //idea.addItem(actionMove);
            //idea.addItem(actionWait);
            //idea.addItem(actionTeleport);
            //idea.addItem(actionWait);

            /*
             var emptyRoom = this.god.getEmptyRoom(this.denizen);

             if (emptyRoom) {
             var actionEvaluate = new Action('evaluate', [function () {
             var activities = this.getAvailableActivities();

             if (!_.isEmpty(activities)) {
             var activity = activities[0];
             activity.addOwner(self.denizen);
             activity.perform();
             }
             console.log('Activities', activities);
             return true;
             }, emptyRoom]);

             //idea.addItem(new Action('move', [emptyRoom.body.x, emptyRoom.body.y]));
             //idea.addItem(actionGesture);
             //idea.addItem(actionGesture);
             //idea.addItem(new Action('interact', [emptyRoom, new Action('lights', [!emptyRoom.ligthsOn])]));
             //idea.addItem(actionWait);
             //idea.addItem(actionWalk);
             //idea.addItem(actionWait);
             //idea.addItem(actionEvaluate);
             //idea.addItem(actionWait);
             //idea.addItem(actionWait);
             //idea.addItem(actionWait);
             //idea.addItem(new Action('fly', [500, 200]));
             //idea.addItem(new Action('halt'));
             //idea.addItem(actionWait);



             } else {
             idea.addItem(actionWait);
             }

             //self.on.thought.dispatch(idea);
             //self.on.thought.dispatch(idea);
             */

            var room = this.god.getRoomByCoordinates(this.denizen.getPosition().x, this.denizen.getPosition().y);

            if (room && room.hasActivity('light')) {

                var lightActivity = room.getActivity('light');
                if (lightActivity.isResolved())
                    lightActivity.perform();

                var activities = this.god.getAvailableActivities();
                if (!_.isEmpty(activities)) {
                    var activity = activities[0];
                    var targetRoom = activity.room;

                    this.getWalkIdea(room, targetRoom, idea);

                    activity.addOwner(self.denizen);

                    idea.addItem(new Action('interact', [
                        targetRoom,
                        new Action('performActivity')
                    ]));

                    idea.addItem(new Action('wait', [2000]));
                } else {
                    idea.addItem(new Action('wait', [1000 + Math.random() * 2000]));

                    var emptyRoom = this.god.getEmptyRoom(this.denizen);

                    if (emptyRoom) {
                        this.getWalkIdea(room, emptyRoom, idea);
                    }
                }
            } else {

                idea.addItem(new Action('wait', [2000]));
            }

            self.on.thought.dispatch(idea);
        },

        getWalkIdea: function (startRoom, endRoom, idea) {
            idea = idea || new Idea();

            var coordinates = this.god.findPath(startRoom, endRoom);

            _.each(coordinates, function (coord) {
                idea.addItem(new Action('move', [coord.x, coord.y]));
            });

            return idea;
        }
    });

    return Conscience;
})
;