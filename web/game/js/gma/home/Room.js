define(['myclass', 'gma/Entity', 'gma/home/Power'], function (my, Entity, Power) {
    var Room = my.Class(Entity, {
        constructor: function (stage, look) {
            Room.Super.call(this, stage, look);

            this.activities = [];
            this.power = new Power();
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
        }
    });

    return Room;
});
