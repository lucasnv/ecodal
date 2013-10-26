define(['myclass', 'gma/Entity', 'gma/home/Power', 'gma/Resource'], function (my, Entity, Power, Resource) {
    var Room = my.Class(Entity, {
        constructor: function (stage, look) {
            Room.Super.call(this, stage, look);

            this.denizens = [];
            this.activities = [];
            this.power = new Power();

            this.connections = [];

            this.light = new createjs.Container();
            var lightSpriteSheet = new createjs.SpriteSheet({
                "images": [Resource.loader.getResult('light')],
                "frames": {width: 50, height: 30, regX: 0, regY: 0, count: 2},
                "animations": {
                    "on": 0,
                    "off": 1
                }
            });
            var lightSprite = new createjs.Sprite(lightSpriteSheet, 'off');
            this.light.addChild(lightSprite);

            var roomBounds = this.body.getBounds();
            var lightBounds = this.light.getBounds();

            this.light.x = Math.round(roomBounds.width * 0.5 - lightBounds.width * 0.5);

            this.body.addChild(this.light);
        },

        toString: function () {
            return 'room';
        },

        addActivity: function (activity) {
            activity.init(this);
            this.activities.push(activity);
        },

        getActivities: function () {
            return this.activities;
        },

        getAvailableActivities: function () {
            return _.filter(this.activities, function (activity) {
                return activity.isAvailable();
            });
        },

        getActivity: function (name) {
            return _.findWhere(this.activities, {name: name});
        },

        hasActivity: function (name) {
            return !!_.findWhere(this.activities, {name: name});
        },

        addConnection: function (room, coordinates) {
            this.connections.push({
                room: room,
                coordinates: coordinates
            });
        },

        getConnection: function (room) {
            return _.findWhere(this.connections, {room: room});
        },

        performActivity: function (name, denizen) {
            var activity = this.getActivity(name);

            if (activity) {
                return activity.perform(denizen);
            }

            return null;
        }
    });

    return Room;
});
