define(['myclass', 'gma/Entity', 'gma/home/Power'], function (my, Entity, Power) {
    var Room = my.Class(Entity, {
        constructor: function (stage, look) {
            Room.Super.call(this, stage, look);

            this.denizens = [];
            this.activities = [];
            this.power = new Power();

            this.connections = [];
        },

        toString: function () {
            return 'room';
        },

        addActivity: function (activity) {
            this.activities.push(activity);
        },

        getAvailableActivities: function () {
            return _.filter(this.activities, function (activity) {
                return activity.isAvailable();
            });
        },

        addConnection: function (room, coordinates) {
            this.connections.push({
                room: room,
                coordinates: coordinates
            });
        },

        getConnection: function (room) {
            return _.findWhere(this.connections, {room: room});
        }
    });

    return Room;
});
