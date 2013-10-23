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
            activity.init(this);
            this.activities.push(activity);
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

        performActivity: function (name, params) {
            var activity = this.getActivity(name);

            if (activity) {
                return activity.perform(params);
            }

            return null;
        }
    });

    return Room;
});
