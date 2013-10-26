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

            if (room) {
                var activities = this.god.getAvailableActivities(this.denizen);
                var evil = [true, false, false];
                var doEvil = _.sample(evil, 1)[0] == true;
                if (!_.isEmpty(activities) && doEvil) {
                    var sample = _.sample(activities, 1);

                    var activity = sample[0];
                    activity.addOwner(this.denizen);

                    var targetRoom = activity.room;

                    this.getWalkIdea(room, targetRoom, idea);
                    this.getLightIdea(targetRoom, idea);

                    this.getActivityIdea(activity, idea);
                } else {
                    this.getRandomWaitIdea(idea);

                    var emptyRoom = this.god.getEmptyRoom(this.denizen);

                    if (emptyRoom) {
                        this.getWalkIdea(room, emptyRoom, idea);
                        this.getLightIdea(emptyRoom, idea);
                        this.getRandomWaitIdea(idea);
                    }
                }
            } else {
                this.getRandomWaitIdea(idea);
            }

            self.on.thought.dispatch(idea);
        },

        getContext: function () {
            var room = this.god.getRoomByDenizen(this.denizen);

            return {
                room: room
            };
        },

        getWalkIdea: function (startRoom, endRoom, idea) {
            idea = idea || new Idea();

            var coordinates = this.god.findPath(startRoom, endRoom);

            _.each(coordinates, function (coord) {
                idea.addItem(new Action('move', [coord.x, coord.y, coord.z]));
            });

            return idea;
        },

        getLightIdea: function (room, idea) {
            idea = idea || new Idea();

            var self = this;

            if (room.hasActivity('light')) {
                idea.addItem(new Action('evaluate', [function () {
                    var lightActivity = room.getActivity('light');
                    if (lightActivity.isResolved()) {
                        lightActivity.perform(self.denizen);
                    }
                    return true;
                }]));
            }

            return idea;
        },

        getRandomWaitIdea: function (idea, minWait, maxWait) {
            idea = idea || new Idea();
            minWait = minWait || 0;
            maxWait = maxWait || 5000;

            var waitDiff = maxWait - minWait;
            if (waitDiff < minWait) {
                waitDiff = 0;
            }

            return idea.addItem(new Action('wait', [minWait + Math.round(Math.random() * waitDiff)]));
        },

        getActivityIdea: function (activity, idea) {
            idea = idea || new Idea();

            if (activity.config.idea) {
                idea.addItem(new Action('execute', [activity.config.idea]));
                return idea;
            }

            if (activity.config.position) {
                idea.addItem(new Action('move', [activity.config.position.x, activity.config.position.y]));
            }

            if (activity.config.gesture) {
                idea.addItem(new Action('gesture', [activity.config.gesture]));
            }

            idea.addItem(new Action('interact', [
                activity.room,
                new Action('performActivity', [activity.name, this.denizen])
            ]));

            var time = activity.config.time || 1000;

            idea.addItem(new Action('wait', [time]));

            var roomPos = this.god.getRoomCenter(activity.room);

            idea.addItem(new Action('move', [roomPos.x, roomPos.y]));

            return idea;
        }
    });

    return Conscience;
})
;